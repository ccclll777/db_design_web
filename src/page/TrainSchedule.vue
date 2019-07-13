<template>
    <div class="fillcontain">
        <head-top></head-top>
        <el-form :model="searchForm"  ref="searchForm">
        <el-row :gutter="20" style="margin-left: 300px;margin-top: 10px;width: 800px">
            <el-col :span="4"><div class="grid-content bg-purple">
                <el-input v-model="searchForm.start_station" placeholder="请输入始发站">

                </el-input>
            </div></el-col>
            <el-col :span="4"><div class="grid-content bg-purple">
                <el-input v-model="searchForm.end_station" placeholder="请输入终点站">

                </el-input>
            </div></el-col>
            <el-col :span="6"><div class="grid-content bg-purple">
                <div class="block">
                    <el-date-picker
                        v-model="searchForm.date"
                        type="date"
                        placeholder="选择日期">
                    </el-date-picker>
                </div>
            </div></el-col>
            <el-col :span="6"><div class="grid-content bg-purple">
                <el-button type="primary" round  @click="submitForm('searchForm')">搜索</el-button>
            </div></el-col>
        </el-row>
        </el-form>
        <div class="table_container">
            <el-table
                :data="tableData"
                style="width: 100%"
                row-key="train_number"
                :tree-props="{children: 'tableData_c', hasChildren: 'true'}">

                <el-table-column
                  label="车次"
                  prop="train_number">
                </el-table-column>
                <el-table-column
                  label="出发站"
                  prop="start_station">
                </el-table-column>
                <el-table-column
                  label="到达站"
                  prop="end_station">
                </el-table-column>
                <el-table-column
                    label="出发时间"
                    prop="start_time">
                </el-table-column>
                <el-table-column
                    label="到达时间"
                    prop="arrive_time">
                </el-table-column>
                <el-table-column
                    label="运行时间"
                    prop="running_time">
                </el-table-column>
                <!--<el-table-column label="操作" width="200">-->
                  <!--<template slot-scope="scope">-->
                    <!--<el-button-->
                      <!--size="mini"-->
                      <!--@click="handleEdit(scope.$index, scope.row)">编辑</el-button>-->
                    <!--<el-button-->
                      <!--size="mini"-->
                      <!--type="Success"-->
                      <!--@click="addFood(scope.$index, scope.row)">添加食品</el-button>-->
                    <!--<el-button-->
                      <!--size="mini"-->
                      <!--type="danger"-->
                      <!--@click="handleDelete(scope.$index, scope.row)">删除</el-button>-->
                  <!--</template>-->
                <!--</el-table-column>-->
            </el-table>
            <div class="Pagination">
                <el-pagination
                  @size-change="handleSizeChange"
                  @current-change="handleCurrentChange"
                  :current-page="currentPage"
                  :page-size="20"
                  layout="total, prev, pager, next"
                  :total="count">
                </el-pagination>
            </div>
            <el-dialog title="修改店铺信息" v-model="dialogFormVisible">
                <el-form :model="selectTable">
                    <el-form-item label="店铺名称" label-width="100px">
                        <el-input v-model="selectTable.name" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="详细地址" label-width="100px">
                        <el-autocomplete
                          v-model="address.address"
                          :fetch-suggestions="querySearchAsync"
                          placeholder="请输入地址"
                          style="width: 100%;"
                          @select="addressSelect"
                        ></el-autocomplete>
                        <span>当前城市：{{city.name}}</span>
                    </el-form-item>
                    <el-form-item label="店铺介绍" label-width="100px">
                        <el-input v-model="selectTable.description"></el-input>
                    </el-form-item>
                    <el-form-item label="联系电话" label-width="100px">
                        <el-input v-model="selectTable.phone"></el-input>
                    </el-form-item>
                    <el-form-item label="店铺分类" label-width="100px">
                        <el-cascader
                          :options="categoryOptions"
                          v-model="selectedCategory"
                          change-on-select
                        ></el-cascader>
                    </el-form-item>
                    <el-form-item label="商铺图片" label-width="100px">
                        <el-upload
                          class="avatar-uploader"
                          :action="baseUrl + '/v1/addimg/shop'"
                          :show-file-list="false"
                          :on-success="handleServiceAvatarScucess"
                          :before-upload="beforeAvatarUpload">
                          <img v-if="selectTable.image_path" :src="baseImgPath + selectTable.image_path" class="avatar">
                          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                    </el-form-item>
                </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="updateShop">确 定</el-button>
              </div>
            </el-dialog>
        </div>
    </div>
</template>

<script>
    import headTop from '../components/headTop'
    import {baseUrl, baseImgPath} from '@/config/env'
    import {cityGuess, getResturants, getResturantsCount, foodCategory, updateResturant, searchplace, deleteResturant,searchTrainSchedule} from '@/api/getData'
    export default {
        data(){
            return {
                baseUrl,
                baseImgPath,
                city: {},
                offset: 0,
                limit: 20,
                count: 0,
                tableData: [
                    {
                         train_number:"01",
                         start_station:"02",
                         end_station:"03",
                        start_time:"04",
                       arrive_time:"05",
                        running_time:"06",
                        tableData_c:[
                            {
                                train_number:"01",
                                start_station:"02",
                                end_station:"03",
                                start_time:"04",
                                arrive_time:"05",
                                running_time:"06"
                            }
                        ]

                    }
                ],
                currentPage: 1,
                selectTable: {},
                dialogFormVisible: false,
                categoryOptions: [],
                selectedCategory: [],
                address: {},
                searchForm:
                    {
                        start_station: '',
                        end_station:"",
                        date:""

                    }
            }
        },
        created(){
            this.initData();
            console.log(11111)
        },
    	components: {
    		headTop,
    	},
        methods: {
            async initData(){
                try{
                    this.city = await cityGuess();
                    const countData = await getResturantsCount();
                    if (countData.status == 1) {
                        this.count = countData.count;
                    }else{
                        throw new Error('获取数据失败');
                    }
                    this.getResturants();
                }catch(err){
                    console.log('获取数据失败', err);
                }
            },
            async getCategory(){
                try{
                    const categories = await foodCategory();
                    categories.forEach(item => {
                        if (item.sub_categories.length) {
                            const addnew = {
                                value: item.name,
                                label: item.name,
                                children: []
                            }
                            item.sub_categories.forEach((subitem, index) => {
                                if (index == 0) {
                                    return
                                }
                                addnew.children.push({
                                    value: subitem.name,
                                    label: subitem.name,
                                })
                            })
                            this.categoryOptions.push(addnew)
                        }
                    })
                }catch(err){
                    console.log('获取商铺种类失败', err);
                }
            },
            async getResturants(){
                const {latitude, longitude} = this.city;
                const restaurants = await getResturants({latitude, longitude, offset: this.offset, limit: this.limit});
                this.tableData = [];
                restaurants.forEach(item => {
                    const tableData = {};
                    tableData.name = item.name;
                    tableData.address = item.address;
                    tableData.description = item.description;
                    tableData.id = item.id;
                    tableData.phone = item.phone;
                    tableData.rating = item.rating;
                    tableData.recent_order_num = item.recent_order_num;
                    tableData.category = item.category;
                    tableData.image_path = item.image_path;
                    this.tableData.push(tableData);
                })
            },
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                this.currentPage = val;
                this.offset = (val - 1)*this.limit;
                this.getResturants()
            },
            handleEdit(index, row) {
                this.selectTable = row;
                this.address.address = row.address;
                this.dialogFormVisible = true;
                this.selectedCategory = row.category.split('/');
                if (!this.categoryOptions.length) {
                    this.getCategory();
                }
            },
            addFood(index, row){
                this.$router.push({ path: 'addGoods', query: { restaurant_id: row.id }})
            },
            async handleDelete(index, row) {
                try{
                    const res = await deleteResturant(row.id);
                    if (res.status == 1) {
                        this.$message({
                            type: 'success',
                            message: '删除店铺成功'
                        });
                        this.tableData.splice(index, 1);
                    }else{
                        throw new Error(res.message)
                    }
                }catch(err){
                    this.$message({
                        type: 'error',
                        message: err.message
                    });
                    console.log('删除店铺失败')
                }
            },
            async querySearchAsync(queryString, cb) {
                if (queryString) {
                    try{
                        const cityList = await searchplace(this.city.id, queryString);
                        if (cityList instanceof Array) {
                            cityList.map(item => {
                                item.value = item.address;
                                return item;
                            })
                            cb(cityList)
                        }
                    }catch(err){
                        console.log(err)
                    }
                }
            },
            addressSelect(vale){
                const {address, latitude, longitude} = vale;
                this.address = {address, latitude, longitude};
            },
            handleServiceAvatarScucess(res, file) {
                if (res.status == 1) {
                    this.selectTable.image_path = res.image_path;
                }else{
                    this.$message.error('上传图片失败！');
                }
            },
            beforeAvatarUpload(file) {
                const isRightType = (file.type === 'image/jpeg') || (file.type === 'image/png');
                const isLt2M = file.size / 1024 / 1024 < 2;

                if (!isRightType) {
                    this.$message.error('上传头像图片只能是 JPG 格式!');
                }
                if (!isLt2M) {
                    this.$message.error('上传头像图片大小不能超过 2MB!');
                }
                return isRightType && isLt2M;
            },
            async updateShop(){
                this.dialogFormVisible = false;
                try{
                    Object.assign(this.selectTable, this.address);
                    this.selectTable.category = this.selectedCategory.join('/');
                    const res = await updateResturant(this.selectTable)
                    if (res.status == 1) {
                        this.$message({
                            type: 'success',
                            message: '更新店铺信息成功'
                        });
                        this.getResturants();
                    }else{
                        this.$message({
                            type: 'error',
                            message: res.message
                        });
                    }
                }catch(err){
                    console.log('更新餐馆信息失败', err);
                }
            },
            async submitForm(formName) {
                this.$refs[formName].validate(async (valid) => {
                    if (valid) {
                        console.log(this.searchForm.date);
                        const res = await searchTrainSchedule({train_start_station:this.searchForm.start_station , train_end_station:this.searchForm.end_station ,date :this.searchForm.date})
                        if (res.status == 1) {
                            this.$message({
                                type: 'success',
                                message: '搜索成功'

                            });
                            this.tableData = [];
                            for(var i = 0 ; i < res.trainScheduleInfoList.length ; i++ )
                            {

                                const tableData = {};
                                tableData.train_number = res.trainScheduleInfoList[i].train_number;
                                tableData.start_station =res.trainScheduleInfoList[i].start_station;
                                tableData.end_station = res.trainScheduleInfoList[i].end_station;
                                tableData.start_time = res.trainScheduleInfoList[i].start_time;
                                tableData.arrive_time = res.trainScheduleInfoList[i].arrive_time;
                                const start_running_time = res.trainScheduleInfoList[i].start_running_time;
                                const end_running_time = res.trainScheduleInfoList[i].end_running_time;
                                const start_running_time2 = start_running_time.split(":");
                                const end_running_time2 = end_running_time.split(":");
                                const start_second =  parseInt(start_running_time2[0]) *60   + parseInt(start_running_time2[1]);
                                const end_second =  parseInt(end_running_time2[0]) *60   + parseInt(end_running_time2[1]);
                                const sub  = end_second -start_second;
                                const h = Math.floor(sub/60);
                                const min = sub%60;
                                const h2   =   h.toString();
                                const min2   =   min.toString();
                                let min3 = "";
                                let h3 = "";
                                if(h2.length == 1)
                                {
                                     h3 = "0" +h2;
                                }
                                else
                                {
                                     h3 = h2;
                                }
                                if(min2.length == 1)
                                {
                                     min3 = "0" +min2;
                                }
                                else
                                {
                                     min3 = min2;
                                }

                                const result = h3+":"+min3;
                                console.log(result);
                                tableData.running_time = result;
                                this.tableData.push(tableData);

                            }
                        }else{
                            this.$message({
                                type: 'error',
                                message: '搜索失败，没有对应的列车'
                            });
                        }
                    }

                });
            },
        },
    }
</script>

<style lang="less">
	@import '../style/mixin';
    .demo-table-expand {
        font-size: 0;
    }
    .demo-table-expand label {
        width: 90px;
        color: #99a9bf;
    }
    .demo-table-expand .el-form-item {
        margin-right: 0;
        margin-bottom: 0;
        width: 50%;
    }
    .table_container{
        padding: 20px;
    }
    .Pagination{
        display: flex;
        justify-content: flex-start;
        margin-top: 8px;
    }
    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }
    .avatar-uploader .el-upload:hover {
        border-color: #20a0ff;
    }
    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 120px;
        height: 120px;
        line-height: 120px;
        text-align: center;
    }
    .avatar {
        width: 120px;
        height: 120px;
        display: block;
    }
</style>
