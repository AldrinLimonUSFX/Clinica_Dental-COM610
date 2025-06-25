<template>
    <div class="section appointment-area">
        <div class="container">
            <!--  Appointment Wrapper Start -->
            <div class="appointment-wrapper">
                <div class="row">
                    <div class="col-lg-5 col-md-5">
                        <div class="appointment-content">
                            <!--  Appointment Title Start -->
                            <div class="section-title appointment-main-title">
                                <h3 class="sub-title">Contacto</h3>
                                <h2 class="title">Ponte en contacto</h2>
                                <p>
                                    Si tienes preguntas o necesitas más información, no dudes en escribirnos.
                                    Estamos aquí para ayudarte con cualquier consulta.
                                </p>
                            </div>
                            <!--  Appointment Title End -->

                            <!--  Appointment Img Start -->
                            <div class="appointment-img">
                                <img src="@/assets/images/appointment-img.png" alt="" />
                            </div>
                            <!--  Appointment Img End -->
                        </div>
                    </div>
                    <div class="col-lg-7 col-md-7">
                        <!--  Appointment Form Wrapper Start -->
                        <div class="appointment-form-wrapper">
                            <!--  Appointment Title Wrapper Start -->
                            <div class="appointment-title-wrapper">
                                <div class="appointment-title">
                                    <h3 class="title">Formulario de contacto</h3>
                                    <span>Completa los campos para que podamos ayudarte.</span>
                                </div>
                                <div class="appointment-icon">
                                    <i class="ri-phone-fill"></i>
                                </div>
                            </div>
                            <!--  Appointment Title Wrapper End -->

                            <!--  Appointment Form Inner Start -->
                            <div class="appointment-form-inner">
                                <form @submit.prevent="CambiarBoton">
                                    <div class="row">
                                        <div class="col-sm-6">
                                            <div class="single-form">
                                                <input type="text" placeholder="Nombre" />
                                                <i class="flaticon-user"></i>
                                            </div>
                                        </div>
                                        <div class="col-sm-6">
                                            <div class="single-form">
                                                <input type="email" placeholder="Correo" />
                                                <i class="flaticon-message"></i>
                                            </div>
                                        </div>
                                        <div class="col-sm-6">
                                            <div class="single-form">
                                                <input type="text" placeholder="Celular" />
                                                <i class="flaticon-phone-call"></i>
                                            </div>
                                        </div>
                                        <div class="col-sm-6">
                                            <div class="single-form">
                                                <input type="text" placeholder="Motivo" />
                                            </div>
                                        </div>
                                        <div class="col-sm-12">
                                            <p class="form-message mt-3 alert-danger"></p>
                                        </div>

                                        <div class="col-sm-12">
                                            <!-- Mostrar botón o mensaje de agradecimiento -->
                                            <button v-if="!mensajeEnviado" class="btn" type="submit">{{ textoBoton
                                                }}</button>
                                            <p v-else class="thank-you-message">Gracias por tu mensaje. Nos pondremos en
                                                contacto pronto.</p>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <!--  Appointment Form Inner End -->
                        </div>
                        <!--  Appointment Form Wrapper End -->
                    </div>
                </div>
            </div>
            <!--  Appointment Wrapper End -->
        </div>
        <img class="shape d-none d-md-block" src="@/assets/images/r-shape.png" alt="" />
    </div>
</template>

<script>
import { ref, defineComponent } from 'vue';

export default defineComponent({
    setup() {
        // Estado reactivo para el botón y el mensaje
        const textoBoton = ref('Enviar');
        const mensajeEnviado = ref(false);

        const CambiarBoton = () => {
            // Cambiar estado para mostrar el mensaje
            mensajeEnviado.value = true;
        };

        return {
            textoBoton,
            mensajeEnviado,
            CambiarBoton,
        };
    },
});
</script>

<style>
.thank-you-message {
    text-align: center;
    font-size: 1.5rem;
    color: rgb(255, 255, 255);
    margin-top: 15px;
    align-content: center;
}
</style>
