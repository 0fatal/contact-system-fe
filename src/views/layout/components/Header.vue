<template>
    <div class="header">
        <div class="info">
            <div class="nickname">{{ user.nickname }}</div>
        </div>
        <div class="logout">
            <a
                @click="$router.push('/login')"
                class="text-blue-400 text-sm pr-3 cursor-pointer"
                >退出</a
            >
        </div>
    </div>
</template>

<script>
import { ApiGet } from '@/utils/request'

export default {
    name: 'Header',
    data() {
        return {
            user: {},
        }
    },
    async created() {
        const user = await ApiGet('/user/info')
        this.user = user
    },
}
</script>

<style>
.header {
    background: #fff;
    width: 100%;
    padding: 0;
    height: 100%;
    display: flex;
    align-items: center;
}

.info {
    margin-left: auto;
    justify-self: flex-end;
    display: flex;
    align-items: center;
    margin-right: 30px;
}

.avatar {
    margin-right: 30px;
}
</style>
