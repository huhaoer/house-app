<template>
  <div class="compare">
    <div class="compare-house">房源对比</div>
    <table class="com-table">
        <tbody class="one-body">
            <tr>
                <td>房源名称</td>
            </tr>
            <tr>
                <td>房源价格</td>
            </tr>
            <tr>
                <td>房源位置</td>
            </tr>
            <tr>
                <td>房源面积</td>
            </tr>
            <tr>
                <td>租房方式</td>
            </tr>
            <tr>
                <td>上架时间</td>
            </tr>
            <tr>
                <td>客厅数量</td>
            </tr>
            <tr>
                <td>卧室数量</td>
            </tr>
            <tr>
                <td>厨房数量</td>
            </tr>
            <tr>
                <td>厕所数量</td>
            </tr>
        </tbody>
        <tbody v-for="(item,index) in comList" :key="index">
            <tr>
                <td>{{ item.BuildName }}</td>
            </tr>
            <tr>
                <td>{{ item.BuildPrice }}</td>
            </tr>
            <tr>
                <td>{{ item.BuildLocation }}</td>
            </tr>
            <tr>
                <td>{{ item.BuildArea }}</td>
            </tr>
            <tr>
                <td>{{ item.BuildType }}</td>
            </tr>
            <tr>
                <td>{{ item.BuildTime }}</td>
            </tr>
            <tr>
                <td>{{ item.BuildHall }}</td>
            </tr>
            <tr>
                <td>{{ item.BuildRoom }}</td>
            </tr>
            <tr>
                <td>{{ item.BuildKitchen }}</td>
            </tr>
            <tr>
                <td>{{ item.BuildWc }}</td>
            </tr>
        </tbody>
    </table>
  </div>
</template>

<script>
export default {
    data() {
        return {
            comList: [],//遍历对比的数组
        }
    },
    mounted() {
        this.comList = this.$route.params.ComList
        console.log(this.comList,'对比的数据=======================')
    }
}   
</script>

<style lang='less' scoped>
.compare{
    width: 90%;
    // background-color: red;
    margin: 0 auto;
    margin-top: 60px;
    .compare-house{
        width: 100%;
        height: 50px;
        line-height: 50px;
        color: #000;
        font-size: 18px;
        font-weight: bold;
    }
    .com-table{
        border: 1px solid #ccc;
        width: 100%;
        padding: 15px;
        box-sizing: border-box;
        display: flex;
        justify-content: flex-start;
        tbody{
            &.one-body{
                tr{
                    td{
                        &:nth-of-type(1){
                            font-weight: bold;
                        }
                    }
                }
            }
            tr{
                height: 50px;
                display: flex;
                justify-content: flex-start;
                td{
                    width: 200px;
                    border: 1px solid #e3e3e3;
                    text-align: center;
                    line-height: 50px;
                }
            }
        }
    }
}
</style>