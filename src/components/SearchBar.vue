<script setup>

import { Microphone, Search } from "@vicons/fa";
import { Icon } from "@vicons/utils";
import { ref } from "vue";

const handleVoiceClick = () => {
    showModal.value = true
}
const showModal = ref(false) 
</script>

<template>
    <n-input-group style="width: 100%;">
        <n-input round placeholder="Search for a movie" clearable>
            <template #prefix>
                <Icon color="grey">
                    <Search />
                </Icon>
            </template>
        </n-input>
        <n-button round @click="handleVoiceClick">
            <Icon>
                <Microphone />
            </Icon>
        </n-button>
    </n-input-group>
</template>