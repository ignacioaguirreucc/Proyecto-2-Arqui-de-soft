package main

import (
	"log"
	"path/filepath"
	"time"
	"users-api/config"
	controllers "users-api/controllers/users"
	"users-api/internal/tokenizers"
	repositories "users-api/repositories/users"
	services "users-api/services/users"

	"github.com/gin-contrib/cors" // Importar el paquete cors
	"github.com/gin-gonic/gin"
)

func main() {
	// Repositories
	mySQLRepo := repositories.NewMySQL(
		repositories.MySQLConfig{
			Host:     config.MySQLHost,
			Port:     config.MySQLPort,
			Database: config.MySQLDatabase,
			Username: config.MySQLUsername,
			Password: config.MySQLPassword,
		},
	)

	cacheRepo := repositories.NewCache(repositories.CacheConfig{
		TTL: config.CacheDuration,
	})

	memcachedRepo := repositories.NewMemcached(repositories.MemcachedConfig{
		Host: config.MemcachedHost,
		Port: config.MemcachedPort,
	})

	// Tokenizer
	jwtTokenizer := tokenizers.NewTokenizer(
		tokenizers.JWTConfig{
			Key:      config.JWTKey,
			Duration: config.JWTDuration,
		},
	)

	// Services
	service := services.NewService(mySQLRepo, cacheRepo, memcachedRepo, jwtTokenizer)

	// Handlers
	controller := controllers.NewController(service)

	// Create router
	router := gin.Default()

	// Configuración de CORS
	router.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://localhost:3000"},        // Permitir origen del frontend
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE"}, // Métodos permitidos
		AllowHeaders:     []string{"Origin", "Content-Type", "Authorization"},
		ExposeHeaders:    []string{"Authorization"},
		AllowCredentials: true,           // Permitir credenciales (cookies, tokens, etc.)
		MaxAge:           12 * time.Hour, // Cache de las solicitudes pre-flight
	}))

	// Servir archivos estáticos
	router.Static("/static", "./build/static")                   // Archivos estáticos generados
	router.StaticFile("/favicon.ico", "./build/favicon.ico")     // Favicon
	router.StaticFile("/manifest.json", "./build/manifest.json") // Manifest

	// Ruta para el index.html
	router.NoRoute(func(c *gin.Context) {
		c.File(filepath.Join("build", "index.html"))
	})

	// API Endpoints
	router.GET("/users", controller.GetAll)
	router.GET("/users/:id", controller.GetByID)
	router.POST("/users", controller.Create)
	router.PUT("/users/:id", controller.Update)
	router.POST("/login", controller.Login)

	// Run application
	if err := router.Run(":8080"); err != nil {
		log.Panicf("Error running application: %v", err)
	}
}
