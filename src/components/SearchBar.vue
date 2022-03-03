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
        <n-auto-complete
            :input-props="{
                autocomplete: 'disabled'
            }"
            size="large"
            round
            placeholder="Search for a movie"
            clearable
        >
            <template #prefix>
                <Icon color="grey">
                    <Search />
                </Icon>
            </template>
        </n-auto-complete>
        <n-button size="large" @click="handleVoiceClick">
            <Icon>
                <Microphone />
            </Icon>
        </n-button>
    </n-input-group>
    <n-modal v-model:show="showModal">
        <n-card style="width: 80%" :bordered="false" size="huge" role="dialog" aria-modal="true">
            <lottie-player
                src="https://assets5.lottiefiles.com/packages/lf20_kuaqfduw.json"
                background="transparent"
                speed="1"
                loop
                autoplay
            ></lottie-player>
        </n-card>
    </n-modal>
</template>