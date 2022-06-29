<template>
    <div class="flex justify-center items-center bg-blue-200 w-screen h-screen">
        <el-card class="w-[400px] mt-[50px] h-[300px]">
            <div slot="header">
                <span>违约客户管理系统登录</span>
            </div>
            <div>
                <el-form
                    label-width="80px"
                    :model="form"
                    :rules="rules"
                    ref="form"
                >
                    <el-form-item label="用户名" prop="username">
                        <el-input
                            v-model="form.username"
                            placeholder="请输入用户名"
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="密码" prop="password">
                        <el-input
                            v-model="form.password"
                            placeholder="请输入密码"
                        ></el-input>
                    </el-form-item>
                    <el-button
                        class="w-[200px]"
                        type="primary"
                        @click="handleLogin"
                        >登录</el-button
                    >
                </el-form>
            </div>
        </el-card>
    </div>
</template>

<script>
import { ApiGet, ApiPost } from '@/utils/request'

export default {
    name: 'Login',
    data() {
        return {
            form: {
                username: 'admin',
                password: 'admin',
            },
            rules: {
                username: [
                    {
                        required: true,
                        message: '请输入用户名',
                        trigger: 'blur',
                    },
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur' },
                ],
            },
        }
    },

    methods: {
        async handleLogin() {
            await ApiPost('/login', {
                username: this.form.username,
                password: this.form.password,
            })
            const user = await ApiGet('/user/info')
            localStorage.setItem('role', user.role + '')
            this.$message.success('登录成功')
            this.$router.push('/')
        },
    },
}
</script>
