<template>
    <div>
        <input ref="fileInput" type="file" @change="onFileChange"/>
        <button @click="upload">Upload</button>

        <div v-if="image">
            <img :src="image"/>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { type Ref, ref } from "vue"

const image: Ref<any> = ref(null)
const fileInput = ref(null)


const upload = async () => {
    if (!fileInput.value) return

    // upload multipart file

    const formData = new FormData()
    formData.append("file", fileInput.value.files[0])
    formData.append("name", fileInput.value.files[0].name)
    await $fetch("/api/upload", {
        method: "POST",
        body: formData
    }).then((res) => {
        console.log(res)
        image.value = res.url
    })
}

</script>
