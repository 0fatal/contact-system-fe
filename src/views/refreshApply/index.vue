<template>
    <el-card class="card">
        <!-- 对于之前认定为违约的客户，现在由于一些原因，可以进行重生（现在不违约了）。查询列 表展示字段：违约客户、审核状态、认定违约原因、严重程度、认定人 、认定申请时间、认定 审核时间、最新外部等级信息。选择某一条记录，进行违约重生，违约重生界面展示：违约客户、 认定违约原因、严重程度、认定人 、认定申请时间、最新外部等级、选择重生原因。 -->
        <header slot="header">
            <span>违约重生</span>
        </header>
        <el-table :data="tableData">
            <el-table-column label="违约客户" width="180">
                <template slot-scope="scope">
                    <span>
                        {{ scope.row.Target.Name }}
                    </span>
                </template>
            </el-table-column>
            <el-table-column label="违约审核状态" width="180">
                <template slot-scope="scope">
                    <span>
                        {{
                            scope.row.ApplyStatus !== 0
                                ? scope.row.ApplyStatus !== 1
                                    ? '驳回'
                                    : '通过'
                                : '待审核'
                        }}
                    </span>
                </template>
            </el-table-column>
            <el-table-column label="认定违约原因" width="180">
                <template slot-scope="scope">
                    <span>
                        {{ scope.row.RiskReason.Reason }}
                    </span>
                </template>
            </el-table-column>
            <el-table-column prop="RiskLevel" label="严重程度" width="180">
                <template slot-scope="scope">
                    <span>
                        {{
                            scope.row.RiskLevel !== 0
                                ? scope.row.RiskLevel !== 1
                                    ? '高'
                                    : '中'
                                : '低'
                        }}
                    </span>
                </template>
            </el-table-column>
            <el-table-column label="认定人" width="180">
                <template slot-scope="scope">
                    <span>
                        {{
                            scope.row.Checker ? scope.row.Checker.Nickname : '-'
                        }}
                    </span>
                </template>
            </el-table-column>
            <el-table-column prop="CreatedAt" label="认定申请时间" width="180">
            </el-table-column>
            <el-table-column prop="UpdatedAt" label="认定审核时间" width="180">
            </el-table-column>
            <el-table-column
                prop="ExternalLevel"
                label="最新外部等级"
                width="180"
            >
            </el-table-column>
            <el-table-column label="操作" width="180">
                <template slot-scope="scope">
                    <el-button
                        @click="refresh(scope.row)"
                        :disabled="scope.row.ApplyStatus !== 1"
                    >
                        重生</el-button
                    >
                </template>
            </el-table-column>
        </el-table>
        <el-dialog
            title="重生"
            :visible.sync="dialogVisible"
            width="60%"
            append-to-body
        >
            <el-form label-width="120px" :model="refreshForm">
                <el-form-item label="违约客户：">
                    <span>{{ refreshTarget.Target.Name }}</span>
                </el-form-item>

                <el-form-item label="认定违约原因：">
                    <span>{{ refreshTarget.RiskReason.Reason }}</span>
                </el-form-item>
                <el-form-item label="严重程度：" prop="risk_level">
                    {{
                        refreshTarget.RiskLevel !== 0
                            ? refreshTarget.RiskLevel !== 1
                                ? '高'
                                : '中'
                            : '低'
                    }}
                </el-form-item>
                <el-form-item label="认定人：">
                    <span>{{ refreshTarget.Checker.Nickname }}</span>
                </el-form-item>
                <el-form-item label="认定申请时间：">
                    <span>{{ refreshTarget.CreatedAt }}</span>
                </el-form-item>

                <el-form-item label="最新外部等级：">
                    <span>{{ refreshTarget.ExternalLevel || '无' }}</span>
                </el-form-item>
                <el-form-item label="重生原因：" prop="refresh_reason">
                    <el-select
                        class="selector"
                        v-model="refreshForm.refresh_reason"
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
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="handleSubmit">发起重生</el-button>
                <el-button type="primary" @click="dialogVisible = false"
                    >取消</el-button
                >
            </span>
        </el-dialog>
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
            tableData: [],
            dialogVisible: false,
            refreshTarget: {
                Target: {
                    Name: '',
                },
                RiskReason: {
                    Reason: '',
                },
                Checker: {
                    Nickname: '',
                },
            },
            refreshForm: {
                target_name: null,
                refresh_reason: null,
            },
        }
    },
    methods: {
        refresh(target) {
            this.refreshTarget = target
            this.refreshForm.target_name = target.Target.Name
            this.dialogVisible = true
        },

        async handleSubmit() {
            await ApiPost('/refresh/', this.refreshForm)
            this.$message.success('发起重生成功')
            this.dialogVisible = false
        },
    },

    async created() {
        const data = await ApiGet('/identity/list')
        this.tableData = data.filter((v) => v.ApplyStatus !== 0)

        const reasonList = await ApiGet('/reason/list?type=1')
        this.reasonList = reasonList
    },
}
</script>

<style scoped>
header {
    display: flex;
}

.card {
    width: 100%;
}

.btn-submit {
    width: 200px;
}

.selector {
    width: 100%;
}
</style>
