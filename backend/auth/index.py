"""
Авторизация и регистрация игроков города Хазбиково.
Поддерживает регистрацию по нику+паролю и вход.
"""
import json
import os
import hashlib
import psycopg2


CORS = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
}


def hash_password(password: str) -> str:
    return hashlib.sha256(password.encode()).hexdigest()


def get_conn():
    return psycopg2.connect(os.environ["DATABASE_URL"])


def handler(event: dict, context) -> dict:
    if event.get("httpMethod") == "OPTIONS":
        return {"statusCode": 200, "headers": CORS, "body": ""}

    body = json.loads(event.get("body") or "{}")
    action = body.get("action")  # "register" | "login"
    nick = (body.get("nick") or "").strip()
    password = body.get("password") or ""

    if not nick or not password:
        return {"statusCode": 400, "headers": CORS, "body": json.dumps({"error": "Заполните все поля"})}

    conn = get_conn()
    cur = conn.cursor()

    schema = "t_p18469490_vision_2024"

    if action == "register":
        cur.execute(f"SELECT id FROM {schema}.users WHERE nick = %s", (nick,))
        if cur.fetchone():
            conn.close()
            return {"statusCode": 409, "headers": CORS, "body": json.dumps({"error": "Такой ник уже занят"})}

        pw_hash = hash_password(password)
        cur.execute(f"INSERT INTO {schema}.users (nick, password_hash) VALUES (%s, %s) RETURNING id", (nick, pw_hash))
        user_id = cur.fetchone()[0]
        conn.commit()
        conn.close()
        return {"statusCode": 200, "headers": CORS, "body": json.dumps({"ok": True, "nick": nick, "id": user_id})}

    elif action == "login":
        pw_hash = hash_password(password)
        cur.execute(f"SELECT id, nick FROM {schema}.users WHERE nick = %s AND password_hash = %s", (nick, pw_hash))
        row = cur.fetchone()
        conn.close()
        if not row:
            return {"statusCode": 401, "headers": CORS, "body": json.dumps({"error": "Неверный ник или пароль"})}
        return {"statusCode": 200, "headers": CORS, "body": json.dumps({"ok": True, "nick": row[1], "id": row[0]})}

    return {"statusCode": 400, "headers": CORS, "body": json.dumps({"error": "Неизвестное действие"})}
