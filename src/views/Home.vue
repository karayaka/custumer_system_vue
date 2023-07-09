<template>
    <v-container>
        <v-row>
            <v-col cols="12" md="4">
                <v-text-field :loading="customerStore.tableLoading" v-model="customerStore.q" @input="searchChange()" label="Ara" prepend-icon="mdi-text-search"></v-text-field>
            </v-col>
            <v-spacer></v-spacer>
            <v-col align-end cols="12" md="2">
                <v-btn @click="customerStore.setShowDialog()" color="blue-darken-4">Yeni Müşteri</v-btn>
            </v-col>
        </v-row>      
        <v-table>
            <thead>
                <tr>
                    <th class="text-left">
                    TCKN
                    </th>
                    <th class="text-left">
                    Ad
                    </th>
                    <th class="text-left">
                    Soyad
                    </th>
                    <th class="text-left">
                    Doğum Tarihi
                    </th>
                    <th class="text-left">
                    Email
                    </th>
                    <th class="text-left">
                    Güncelle
                    </th>
                </tr>
            </thead>
            <tbody>
            <tr
                v-for="customer in customerStore.customers" :key="customer.id">
                <td>{{ customer.tckn }}</td>
                <td>{{ customer.name }}</td>
                <td>{{ customer.surname }}</td>
                <td>{{ customer.birthDate }}</td>
                <td>{{ customer.email }}</td>
                <td>
                    <v-btn @click="customerStore.updateCustomer(customer.id)" icon="mdi-arrow-up-bold-box-outline" ></v-btn>
                    <v-btn :loading="customerStore.deletLoading" @click="customerStore.deleteCustomer(customer.id)" icon="mdi-delete-circle" ></v-btn>
                </td>
            </tr>
            </tbody>
    </v-table>
    <v-dialog
      v-model="customerStore.showDialog"
      persistent
    >
    <v-container v-if="customerStore.formLoading"  >
        <v-progress-linear indeterminate ></v-progress-linear>
    </v-container>
        
      <v-card v-else>
        <v-card-title v-if="customerStore.id==''" class="text-h5">
          Kayıt Formu
        </v-card-title>
        <v-card-title v-else class="text-h5">
          Güncelleme Formu
        </v-card-title>
        <v-form v-model="customerStore.formValid">
            <v-container>
            <v-row>
                <v-col
                cols="12"
                md="4"
                >
                <v-text-field
                    v-model="customerStore.customer.tckn"
                    :rules="customerStore.tcknRules"
                    label="TCKN"
                    required
                ></v-text-field>
                </v-col>
                <v-col
                cols="12"
                md="4"
                >
                <v-text-field
                    v-model="customerStore.customer.name"
                    :rules="customerStore.nameRules"
                    :counter="10"
                    label="Ad"
                    required
                ></v-text-field>
                </v-col>

                <v-col
                cols="12"
                md="4"
                >
                <v-text-field
                    v-model="customerStore.customer.surname"
                    :rules="customerStore.nameRules"
                    :counter="10"
                    label="Soyad"
                    required
                ></v-text-field>
                </v-col>
            </v-row>
            <v-row>
                <v-col
                cols="12"
                md="6"
                >
                <v-text-field
                    v-model="customerStore.customer.email"
                    :rules="customerStore.emailRules"
                    label="E-mail"
                    required
                ></v-text-field>
                </v-col>
                <v-col
                cols="12"
                md="6"
                >
                <v-text-field
                    v-model="customerStore.customer.birthDate"
                    label="Doğum Tarihi"
                    required
                    type="date"
                >

                </v-text-field>
                </v-col>
            </v-row>
            </v-container>
        </v-form>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="green-darken-1"
            variant="text"
            :loading="customerStore.saveButtonLoading"
            @click="customerStore.saveCustomer()"
            >
            Kaydet
          </v-btn>
          <v-btn
            color="green-darken-1"
            variant="text"
            @click="customerStore.setCloseDialog()"
          >
            Kapat
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    </v-container>    
</template>
<script lang="ts" setup>
import {onMounted} from 'vue'
import {useAppStore} from '@/store/app'


const customerStore=useAppStore();

function searchChange(){
    customerStore.getCustomer();
}
onMounted(()=>{
    customerStore.customer.birthDate='1900-01-01';
    customerStore.getCustomer();
});

</script>
