<template>
    <el-card class="publish">
        <div slot="header" class="clearfix header">
            <span>文章列表</span>
        </div>
        <div class="body">
            <el-table :data="tableData" border style="width: 100%">
                <el-table-column prop="id" label="文章ID" width="180">
                </el-table-column>
                <el-table-column prop="title" label="文章标题" width="180">
                </el-table-column>
                <el-table-column prop="publishTime" label="发布时间">
                </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button
                            size="mini"
                            @click="handleEdit(scope.$index, scope.row)"
                            >编辑</el-button
                        >
                        <el-button
                            size="mini"
                            type="danger"
                            @click="handleDelete(scope.$index, scope.row)"
                            >删除</el-button
                        >
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </el-card>
</template>

<script>
import { ApiGet } from '@/utils/request'

export default {
    data() {
        return {
            tableData: [],
        }
    },

    methods: {
        handleEdit(index, row) {
            console.log(index, row)
        },
        handleDelete(index, row) {
            console.log(index, row)
        },
    },

    async created() {
        try {
            this.tableData = (await ApiGet('/article')).data.data
            this.$message.success('success')
        } catch (e) {
            this.$message.error(e.message)
        }
    },
}
</script>

<style scoped>
.text {
    font-size: 14px;
}

.item {
    margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
    display: table;
    content: '';
}
.clearfix:after {
    clear: both;
}

.publish {
    width: 100%;
    min-height: 500px;
}
</style>
