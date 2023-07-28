<script>
import axios from 'axios';

export default {
    name: "MessageComp",
    components: {

    },
    props: {
        apartment_id: {
            type: Number,
            required: true
        }
    },
    created() {
        console.log(this.apartment_id);
    },

    data() {
        return {
            name: '',
            surname: '',
            mail: '',
            content: '',
            baseUrl: 'http://127.0.0.1:8000',
            success: false,
            errors: {}

        }
    },
    methods: {
        sendMessage() {
            // Resetta gli errori di validazione
            this.errors = {};

            // Verifica se i campi obbligatori sono stati compilati
            if (!this.name) {
                this.errors.name = 'Devi inserire il nome';
            }
            if (!this.surname) {
                this.errors.surname = 'Devi inserire il cognome';
            }
            if (!this.mail) {
                this.errors.mail = 'Devi inserire la mail';
            }
            if (!this.content) {
                this.errors.content = 'Devi inserire il messaggio';
            }

            // Se ci sono errori di validazione, interrompi l'esecuzione del metodo
            if (Object.keys(this.errors).length > 0) {
                return;
            }
            const data = {
                apartment_id: this.apartment_id,
                name: this.name,
                surname: this.surname,
                mail: this.mail,
                content: this.content,
            }
            console.log(data);
            axios.post(`${this.baseUrl}/api/messages`, data).then(res => {
                this.success = res.data.success
                if (this.success) {
                    this.name = '';
                    this.surname = '';
                    this.mail = '';
                    this.content = '';
                } else {
                    this.errors = res.data.errors;
                }
            })
        }
    }

}
</script>
<template>
    <div class="d-flex justify-content-center mt-4">
        <!-- Invio messaggio al proprietario dell'appartamento -->
        <form class="contenitore p-3 my-4 w-75 border rounded-3" @submit.prevent="sendMessage()">
            <h5>Contatta il proprietario</h5>
            <div class="mb-3">
                <label for="InputName" class="form-label">Nome *</label>
                <input v-model="name" type="text" class="form-control" name="name" id="" aria-describedby="helpId"
                    placeholder="Inserisci il tuo nome">
                <strong v-if="errors.name" class="text-danger">{{ errors.name }}</strong>
            </div>

            <div class="mb-3">
                <label for="InputSurname" class="form-label">Cognome *</label>
                <input v-model="surname" type="text" class="form-control" name="surname" id="" aria-describedby="helpId"
                    placeholder="Inserisci il tuo cognome">
                <strong v-if="errors.surname" class="text-danger">{{ errors.surname }}</strong>
            </div>

            <div class="mb-3">
                <label for="InputEmail" class="form-label">Email *</label>
                <input v-model="mail" type="email" class="form-control" name="mail" id="" aria-describedby="helpId"
                    placeholder="Inserisci la tua email">
                <strong v-if="errors.mail" class="text-danger">{{ errors.mail }}</strong>
            </div>

            <div class="mb-3">
                <label for="TextMessage" class="form-label">Messaggio *</label>
                <textarea v-model="content" class="form-control" name="content" id="" rows="3"
                    placeholder="Scrivi il testo del messaggio"></textarea>
                <strong v-if="errors.content" class="text-danger">{{ errors.content }}</strong>
            </div>

            <div class="d-flex justify-content-between">
                <button type="submit" class="btn btn-primary">Invia</button>
                <span class="fs-6 fst-italic">* campi obbligatori</span>
            </div>

        </form>

        <div class="modal" tabindex="-1" :class="{ show: success }">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Conferma invio del messaggio</h5>
                        <button type="button" class="btn-close" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <p>Il messaggio è stato inviato correttamente.</p>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" @click="success = false">Close</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.modal {
    display: none;
}

.contenitore {
    background-color: #85addd;
}

.modal.show {
    display: block;
}
</style>