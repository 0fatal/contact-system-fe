<template>
    <el-menu
        class="menu"
        @open="handleOpen"
        @close="handleClose"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
        :default-active="$route.path"
        router
    >
        <h1 class="text-yellow-300">违约客户管理系统</h1>
        <hr />
        <el-menu-item index="/">
            <i class="el-icon-document"></i>
            <span slot="title">违约认定申请</span>
        </el-menu-item>
        <el-menu-item index="/refresh/apply">
            <i class="el-icon-setting"></i>
            <span slot="title">重生认定申请</span>
        </el-menu-item>
        <template v-if="role === '1'">
            <el-menu-item index="/identify/check">
                <i class="el-icon-setting"></i>
                <span slot="title">违约认定审核</span>
            </el-menu-item>
            <el-menu-item index="/refresh/check">
                <i class="el-icon-setting"></i>
                <span slot="title">重生认定审核</span>
            </el-menu-item>
            <el-menu-item index="/reason">
                <i class="el-icon-setting"></i>
                <span slot="title">违约/重生 理由管理</span>
            </el-menu-item>
        </template>
        <el-menu-item index="/statistics">
            <i class="el-icon-setting"></i>
            <span slot="title">违约统计</span>
        </el-menu-item>
    </el-menu>
</template>

<script>
export default {
    data() {
        return {
            role: '',
        }
    },

    methods: {
        handleOpen(key, keyPath) {
            console.log(key, keyPath)
        },
        handleClose(key, keyPath) {
            console.log(key, keyPath)
        },
    },

    created() {
        this.role = localStorage.getItem('role')
    },
}
</script>

<style>
.tac {
    height: 100%;
}
</style>
