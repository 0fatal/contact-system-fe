<template>
    <el-card class="card">
        <!-- 对于之前认定为违约的客户，现在由于一些原因，可以进行重生（现在不违约了）。查询列 表展示字段：违约客户、审核状态、认定违约原因、严重程度、认定人 、认定申请时间、认定 审核时间、最新外部等级信息。选择某一条记录，进行违约重生，违约重生界面展示：违约客户、 认定违约原因、严重程度、认定人 、认定申请时间、最新外部等级、选择重生原因。 -->
        <header slot="header">
            <span>重生认定审核</span>
        </header>
        <el-table :data="tableData">
            <el-table-column label="违约客户" width="180">
                <template slot-scope="scope">
                    <span>
                        {{ scope.row.identify.Target.Name }}
                    </span>
                </template>
            </el-table-column>

            <el-table-column label="审核状态" width="180">
                <template slot-scope="scope">
                    <span>
                        {{
                            scope.row.Status !== 0
                                ? scope.row.Status !== 1
                                    ? '拒绝'
                                    : '通过'
                                : '待审核'
                        }}
                    </span>
                </template>
            </el-table-column>

            <el-table-column label="认定违约原因" width="180">
                <template slot-scope="scope">
                    <span>
                        {{ scope.row.identify.RiskReason.Reason }}
                    </span>
                </template>
            </el-table-column>

            <el-table-column label="严重程度" width="180">
                <template slot-scope="scope">
                    <span>
                        {{
                            scope.row.identify.RiskLevel !== 0
                                ? scope.row.identify.RiskLevel !== 1
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
                            scope.row.identify.Checker
                                ? scope.row.identify.Checker.Nickname
                                : '-'
                        }}
                    </span>
                </template>
            </el-table-column>
            <el-table-column label="认定申请时间" width="180">
                <template slot-scope="scope">
                    <span>
                        {{ scope.row.identify.CreatedAt }}
                    </span>
                </template>
            </el-table-column>

            <el-table-column label="重生原因" width="180">
                <template slot-scope="scope">
                    <span>
                        {{ scope.row.RefreshReason.Reason }}
                    </span>
                </template>
            </el-table-column>

            <el-table-column label="最新外部等级" width="180">
                <template slot-scope="scope">
                    <span>
                        {{ scope.row.identify.ExternalLevel }}
                    </span>
                </template>
            </el-table-column>
            <el-table-column label="操作" width="180">
                <template slot-scope="scope">
                    <el-button
                        @click="check(scope.row.ID, true)"
                        :disabled="scope.row.Status !== 0"
                        type="primary"
                    >
                        通过</el-button
                    >
                    <el-button
                        @click="check(scope.row.ID, false)"
                        :disabled="scope.row.Status !== 0"
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
import { ApiGet, ApiPost } from '@/utils/request'

export default {
    data() {
        return {
            tableData: [],
        }
    },
    methods: {
        async check(target, approve) {
            await ApiPost('/refresh/check', {
                apply_id: target,
                approve,
            })
            this.$message.success('操作成功')
        },
    },

    async created() {
        let data = await ApiGet('/refresh/list')
        data = await Promise.all(
            data.map(async (item) => {
                const res = await ApiGet(`/identity/${item.ApplyId}`)
                return {
                    ...item,
                    identify: res,
                }
            })
        )
        this.tableData = data
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
