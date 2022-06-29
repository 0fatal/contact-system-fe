<template>
    <el-card class="card">
        <header slot="header">
            <span>违约认定审核</span>
        </header>
        <el-table :data="tableData">
            <el-table-column label="客户名称" width="180">
                <template slot-scope="scope">
                    <span>
                        {{ scope.row.Target.Name }}
                    </span>
                </template>
            </el-table-column>
            <el-table-column label="审核状态" width="180">
                <template slot-scope="scope">
                    <span>
                        {{
                            scope.row.ApplyStatus !== 0
                                ? scope.row.ApplyStatus !== 1
                                    ? '拒绝'
                                    : '同意'
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
            <el-table-column label="备注" width="180">
                <template slot-scope="scope">
                    <span>
                        {{ scope.row.Remark }}
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
            <el-table-column prop="Appendix" label="附件" width="180">
                <template slot-scope="scope">
                    <template v-if="scope.row.Appendix">
                        <span v-for="(a, index) in scope.row.Appendix" :key="a">
                            <a :href="a" target="_blank"
                                >附件{{ index + 1 }},</a
                            >
                        </span>
                    </template>
                    <template v-else>无</template>
                </template>
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
                        @click="check(scope.row.ID, true)"
                        :disabled="scope.row.ApplyStatus !== 0"
                        type="primary"
                    >
                        通过</el-button
                    >
                    <el-button
                        @click="check(scope.row.ID, false)"
                        :disabled="scope.row.ApplyStatus !== 0"
                        type="danger"
                    >
                        拒绝</el-button
                    >
                </template>
            </el-table-column>
        </el-table>
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
            reasonList: [],
            tableData: [],
        }
    },
    methods: {
        async check(target, approve) {
            await ApiPost('/identity/check', {
                apply_id: target,
                approve,
            })
            this.$message.success('操作成功')
        },
    },

    async created() {
        const data = await ApiGet('/identity/list')
        this.tableData = data

        const reasonList = await ApiGet('/reason/list')
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
