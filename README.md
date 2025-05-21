🔧 Sistema de Gestión de Órdenes de Reparación de Electrodomésticos
Aplicación web fullstack para gestionar clientes, órdenes de servicio y reparaciones de electrodomésticos.

🧱 Tecnologías Utilizadas:
*Backend: .NET 6 / C# / Entity Framework Core (code-first)
*Base de Datos: SQL Server
*Frontend: React (Hooks + Componentes Funcionales)
*UI: Material UI o Tailwind CSS
*Otros: Swagger, DTOs, SOLID, Axios

🎯 Funcionalidades:
Backend (.NET + EF Core)
*API RESTful con CRUD para:
*Clientes
*Órdenes
*Reparaciones
*Endpoint personalizado:
  -GET /api/clientes/{id}/reparaciones – lista todas las reparaciones asociadas a un cliente.
  
*Uso de DTOs para separar la lógica del dominio de la presentación.
*Principios SOLID aplicados para una arquitectura limpia y mantenible.
*Validaciones en el servidor.
*Swagger para documentación y prueba de endpoints.

Base de Datos (SQL Server):
*Generación de tablas mediante EF Core (code-first).
*Relaciones entre tablas mediante claves foráneas:
  -Cliente → Órdenes → Reparaciones
*Configuración de conexión desde appsettings.json.

Frontend (React):
*Listado y creación de clientes.
*Vista detallada de clientes y sus órdenes.
*Vista detallada de órdenes con sus reparaciones.
*Creación de órdenes con reparaciones.
*Navegación clara e interfaz intuitiva.
*Consumo de la API mediante axios o fetch.
