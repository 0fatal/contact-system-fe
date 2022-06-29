<template>
    <el-card class="card">
        <!-- 对潜在的违约客户进行人工认定申请，页面内容：客户名称、最新外部等级、违约原因、违 约严重性（高、中、低）、备注信息。 -->
        <header slot="header">
            <span>违约认定申请</span>
        </header>
        <el-form label-width="120px" :model="form" :rules="rules" ref="form">
            <el-form-item label="客户名称" prop="target_name">
                <el-input
                    v-model="form.target_name"
                    placeholder="请输入客户名称"
                ></el-input>
            </el-form-item>
            <el-form-item label="最新外部等级" prop="external_level">
                <el-input
                    v-model="form.external_level"
                    placeholder="请输入最新外部等级"
                ></el-input>
            </el-form-item>
            <el-form-item label="违约原因" prop="risk_reason">
                <el-select
                    class="selector"
                    v-model="form.risk_reason"
                    placeholder="请选择违约原因"
                >
                    <el-option
                        v-for="reason in reasonList"
                        :key="reason.ID"
                        :label="reason.Reason"
                        :value="reason.ID"
                    ></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="违约严重性" prop="risk_level">
                <el-select
                    class="selector"
                    v-model="form.risk_level"
                    placeholder="请选择违约严重性"
                >
                    <el-option label="低" :value="0"></el-option>
                    <el-option label="中" :value="1"></el-option>
                    <el-option label="高" :value="2"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="备注信息" prop="remark">
                <el-input
                    v-model="form.remark"
                    placeholder="请输入备注信息"
                ></el-input>
            </el-form-item>
            <el-form-item label="附件">
                <el-upload
                    class="upload-demo"
                    :on-remove="handleRemove"
                    :before-upload="handleFileChange"
                    :before-remove="beforeRemove"
                    multiple
                    :limit="3"
                    drag
                    :on-exceed="handleExceed"
                    :file-list="fileList"
                >
                    <i class="el-icon-upload"></i>
                    <div class="el-upload__text">
                        将文件拖到此处，或<em>点击上传</em>
                    </div>
                </el-upload>
            </el-form-item>
            <el-button type="primary" @click="handleSubmit" class="btn-submit">
                提交
            </el-button>
        </el-form>
    </el-card>
</template>

<script>
import { ApiGet, ApiPost, baseURL } from '@/utils/request'

export default {
    data() {
        return {
            form: {
                target_name: '',
                risk_reason: '',
                external_level: '',
                risk_level: '',
                remark: '',
                appendix: [],
            },
            fileList: [],
            uploadUrl: baseURL + '/upload',
            reasonList: [],
        }
    },
    methods: {
        async handleSubmit() {
            this.form.appendix = this.fileList.map((file) => file.url)
            await ApiPost('/identity/', this.form)
            this.$message.success('提交成功')
        },
        handleRemove(file, fileList) {
            console.log(fileList)
            this.fileList = fileList.filter((file) => file.url !== file.url)
        },

        async handleFileChange(file, fileList) {
            const form = new FormData()
            form.append('file', file)
            // this.fileList.push(form)
            const data = await ApiPost('/upload', form)
            console.log(data)
            this.fileList.push({
                name: file.name,
                url: data.url,
            })
        },
    },

    async created() {
        const data = await ApiGet('/reason/list')
        this.reasonList = data
    },
}
</script>

<style scoped>
header {
    display: flex;
}

.card {
    width: 600px;
}

.btn-submit {
    width: 200px;
}

.selector {
    width: 100%;
}
</style>
