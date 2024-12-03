from flask import Flask, render_template
import psycopg2
import os

app = Flask(__name__)

# Datos de conexión a PostgreSQL (ajusta estos parámetros según tu configuración de pgAdmin)
DB_HOST = "localhost"  # o "127.0.0.1"
DB_PORT = "5432"     # Dirección del servidor de PostgreSQL (en caso de estar en Render, usa la URL proporcionada)
DB_NAME = "FLOTILLA_VEHICULOS"       # Nombre de la base de datos
DB_USER = "pbl_admin"         # Usuario de la base de datos
DB_PASSWORD = "B0mb3r0s.*2024"  # Contraseña del usuario

# Función para conectar a la base de datos
def get_db_connection():
    conn = psycopg2.connect(
        host=os.getenv('DB_HOST', 'localhost'),  # Usa la variable de entorno DB_HOST
        database=os.getenv('DB_NAME', 'FLOTILLA_VEHICULOS'),
        user=os.getenv('DB_USER', 'pbl_admin'),
        password=os.getenv('DB_PASSWORD', 'B0mb3r0s.*2024')
    )
    return conn

@app.route('/')
def index():
    # Conexión a la base de datos
    conn = get_db_connection()
    cursor = conn.cursor()
    
    # Consulta simple para verificar la conexión
    cursor.execute('SELECT numero_unidad FROM unidades LIMIT 1;')  # Asegúrate de tener una tabla 'greetings' en tu DB
    greeting = cursor.fetchone()  # Obtener un registro de la base de datos
    
    cursor.close()
    conn.close()

    # Si hay un mensaje, lo pasamos a la plantilla HTML
    return render_template('index.html', greeting=greeting[0] if greeting else "¡Hola Mundo!")

if __name__ == "__main__":
    app.run(debug=True)
