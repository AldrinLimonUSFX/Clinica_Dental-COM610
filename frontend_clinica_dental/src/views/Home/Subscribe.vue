<template>
    <div class="section subscribe-area">
        <div class="container">
            <div class="subscribe-wrapper">
                <div class="row">
                    <div class="col-lg-9 col-md-8 col-sm-8">
                        <!--  Subscribe Form Start -->
                        <div class="subscribe-form">
                            <form id="subscribe-form" @submit.prevent="sendEmail">
                                <input type="email" v-model="userEmail" placeholder="Ingresa tu correo electrónico"
                                    required />
                                <i class="ri-mail-unread-fill"></i>
                            </form>
                        </div>
                        <!--  Subscribe Form End -->
                    </div>
                    <div class="col-lg-3 col-md-4 col-sm-4">
                        <!--  Subscribe Button Start -->
                        <div class="subscribe-btn">
                            <button class="btn" type="submit" form="subscribe-form">Suscribir</button>
                        </div>
                        <!--  Subscribe Button End -->
                    </div>
                </div>
                <p v-if="statusMessage" :class="{ success: isSuccess, error: !isSuccess }">{{ statusMessage }}</p>
            </div>
        </div>
    </div>
</template>

<script>
import { ref } from "vue";

export default {
    setup() {
        const userEmail = ref("");
        const statusMessage = ref("");
        const isSuccess = ref(false);

        const sendEmail = () => {
            if (!userEmail.value) {
                statusMessage.value = "Por favor, ingresa un correo válido.";
                isSuccess.value = false;
                return;
            }

            // Configuración de EmailJS
            const serviceID = "service_9xz11fi"; // Reemplaza con tu Service ID
            const templateID = "template_440r22o"; // Reemplaza con tu Template ID
            const templateParams = {
                to_name: "Equipo de DiwaDental",
                userEmail: userEmail.value,
            };

            emailjs
                .send(serviceID, templateID, templateParams)
                .then(
                    () => {
                        statusMessage.value =
                            "Gracias por suscribirte. Hemos enviado un correo de confirmación.";
                        isSuccess.value = true;
                    },
                    (error) => {
                        console.error("Error:", error);
                        statusMessage.value =
                            "Lo sentimos, ocurrió un problema al enviar el correo.";
                        isSuccess.value = false;
                    }
                );
        };

        return {
            userEmail,
            statusMessage,
            isSuccess,
            sendEmail,
        };
    },
};
</script>

<style>
.success {
    color: green;
    font-weight: bold;
    margin-top: 10px;
}

.error {
    color: red;
    font-weight: bold;
    margin-top: 10px;
}
</style>
