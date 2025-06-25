<template>
    <div class="error-container">
        <div class="error-content">
            <!-- Icono de error -->
            <div class="error-icon">
                <svg viewBox="0 0 24 24" class="w-16 h-16 text-red-500">
                    <path fill="currentColor"
                        d="M12 4c4.41 0 8 3.59 8 8s-3.59 8-8 8-8-3.59-8-8 3.59-8 8-8m0-2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
                </svg>
            </div>

            <!-- Contenido del error -->
            <div class="error-info">
                <h1 class="error-code">404</h1>
                <h2 class="error-title">Página no encontrada</h2>
                <p class="error-description">Lo sentimos, la página que buscas no está disponible.</p>
            </div>

            <!-- Enlaces de ayuda -->
            <div class="help-links">
                <router-link to="/" class="help-link">
                    <span class="link-icon">
                        <i class="pi pi-home"></i>
                    </span>
                    <div class="link-content">
                        <span class="link-title">Volver al inicio</span>
                        <span class="link-subtitle">Regresa a la página principal</span>
                    </div>
                </router-link>
            </div>
        </div>
    </div>
</template>

<style scoped>
.error-container {
    min-height: 90vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, #f5f7fa 0%, #e4e8eb 100%);
    padding: 1rem;
    margin-top: 10%;
}

.error-content {
    max-width: 32rem;
    width: 100%;
    background: white;
    border-radius: 1rem;
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
    padding: 2rem;
    text-align: center;
}

.error-icon {
    margin: 0 auto 1.5rem;
    width: 4rem;
    height: 4rem;
    animation: bounce 2s infinite;
}

.error-code {
    font-size: 4rem;
    font-weight: 700;
    color: #240090;
    line-height: 1;
    margin: 0 0 0.5rem;
}

.error-title {
    font-size: 1.5rem;
    font-weight: 600;
    color: #1f2937;
    margin-bottom: 0.75rem;
}

.error-description {
    color: #6b7280;
    margin-bottom: 2rem;
}

.help-links {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.help-link {
    display: flex;
    align-items: center;
    padding: 1rem;
    border-radius: 0.5rem;
    background: #f3f4f6;
    transition: all 0.2s ease;
    text-decoration: none;
}

.help-link:hover {
    background: #e5e7eb;
    transform: translateY(-2px);
}

.link-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 2.5rem;
    height: 2.5rem;
    background: #240090;
    border-radius: 0.5rem;
    margin-right: 1rem;
}

.link-icon i {
    color: white;
    font-size: 1.25rem;
}

.link-content {
    text-align: left;
    flex: 1;
}

.link-title {
    display: block;
    font-weight: 600;
    color: #1f2937;
    margin-bottom: 0.25rem;
}

.link-subtitle {
    display: block;
    font-size: 0.875rem;
    color: #6b7280;
}

@keyframes bounce {

    0%,
    100% {
        transform: translateY(0);
    }

    50% {
        transform: translateY(-10px);
    }
}

/* Responsive */
@media (max-width: 640px) {
    .error-content {
        padding: 1.5rem;
    }

    .error-code {
        font-size: 3rem;
    }

    .error-title {
        font-size: 1.25rem;
    }
}
</style>