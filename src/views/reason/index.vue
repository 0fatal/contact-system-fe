<template>
    <el-card class="card">
        <header slot="header">
            <span>违约/重生 理由管理</span>
        </header>
        <el-table :data="tableData">
            <el-table-column label="理由" width="600">
                <template slot-scope="scope">
                    <span>
                        {{ scope.row.Reason }}
                    </span>
                </template>
            </el-table-column>
            <el-table-column label="类型" width="150">
                <template slot-scope="scope">
                    <span>
                        {{ scope.row.Type === 0 ? '违约理由' : '重生理由' }}
                    </span>
                </template>
            </el-table-column>
            <el-table-column label="是否启用" width="180">
                <template slot-scope="scope">
                    <el-switch
                        style="display: block"
                        v-model="scope.row.Status"
                        @change="changeStatus(scope.row.ID, scope.row.Status)"
                        active-color="#13ce66"
                        inactive-color="#ff4949"
                        active-text="启用"
                        inactive-text="关闭"
                    >
                    </el-switch>
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
        async changeStatus(id, status) {
            await ApiPost(`/reason/${id}?open=${status ? '1' : '0'}`)
        },
    },

    async created() {
        this.tableData = await ApiGet('/reason/list/all')
    },
}
</script>

<style scoped>
header {
    display: flex;
}
</style>
