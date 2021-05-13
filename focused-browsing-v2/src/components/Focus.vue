<template>
    <div>
        <h1>Hello World</h1>
        <p>Focused Browsing coming soon</p>
        <button type="button" @click="sendToBackground">Focus</button>
    </div>
</template>
<script>
export default {
    data(){

    },
    methods: {
        sendToBackground() {
            chrome.runtime.sendMessage({greeting: "hello"}, function(response) {
                console.log(response.farewell);
            });
        }

    }
    
}
</script>