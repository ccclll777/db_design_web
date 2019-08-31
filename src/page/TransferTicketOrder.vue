<template>

    <div>
        <head-top></head-top>
        <meta  http-equiv="Cache-Control" content="no-cache,no-store,must-revlidate">
        <meta  http-equiv="Expires" content="O">
        <meta http-equiv="Pragma" content="no-cache">

        <el-steps :active="active" align-center style="margin-top: 10px">
            <el-step title="添加乘客" ></el-step>
            <el-step title="选择座位" ></el-step>
            <el-step title="付款" ></el-step>
            <el-step title="订票成功" ></el-step>
        </el-steps>
        <el-table :data="passenger_data" v-show="show_passenger" style="width: 1000px;margin-left: 80px;margin-top: 20px">

            <el-table-column property="passenger_real_name" label="乘客姓名" ></el-table-column>
            <el-table-column property="passenger_phone_number" label="乘客电话号码" ></el-table-column>
            <el-table-column property="passenger_id_number" label="身份证号"></el-table-column>
            <el-table-column label="操作" width="100">
                <template slot-scope="scope">
                    <el-button size="mini" type="danger" @click="deletepassenger(scope.row.passenger_phone_number)">删除</el-button>

                </template>
            </el-table-column>

        </el-table>

        <el-table :data="passenger_data" v-show="show_passenger_ticket" style="width: 1000px;margin-left: 80px;margin-top: 20px">

            <el-table-column property="passenger_real_name" label="乘客姓名" ></el-table-column>
            <el-table-column property="passenger_phone_number" label="乘客电话号码" ></el-table-column>
            <el-table-column property="passenger_id_number" label="身份证号"></el-table-column>
            <el-table-column property="train_number" label="车次"></el-table-column>
            <el-table-column property="carriage_no" label="车厢号"></el-table-column>
            <el-table-column property="seat_type" label="座位类型"></el-table-column>
            <el-table-column property="seat_no" label="座位号"></el-table-column>

        </el-table>
        <el-table :data="passenger_data_2" v-show="show_passenger_ticket_2" style="width: 1000px;margin-left: 80px;margin-top: 20px">

            <el-table-column property="passenger_real_name" label="乘客姓名" ></el-table-column>
            <el-table-column property="passenger_phone_number" label="乘客电话号码" ></el-table-column>
            <el-table-column property="passenger_id_number" label="身份证号"></el-table-column>
            <el-table-column property="train_number" label="车次"></el-table-column>
            <el-table-column property="carriage_no" label="车厢号"></el-table-column>
            <el-table-column property="seat_type" label="座位类型"></el-table-column>
            <el-table-column property="seat_no" label="座位号"></el-table-column>

        </el-table>
        <div v-show="active === 1 && dialogTableVisible_1" style="margin-top: 40px ;margin-left: 80px">
            <el-table :data="high_seat_1" >
                <el-table-column property="train_number_1" label="车次" width="100"></el-table-column>
                <el-table-column property="carriage_number_1" label="车厢号" width="100"></el-table-column>
                <el-table-column property="seat_type_1" label="座位类型" width="100"></el-table-column>
                <el-table-column property="upper_num_1" label="上铺" width="200"></el-table-column>
                <el-table-column property="lower_num_1" label="下铺" width="200"></el-table-column>
                <el-table-column label="操作" width="200">
                    <template slot-scope="scope">
                        <el-button size="mini" type="primary" @click="handleAdd(scope.row.carriage_number_1,scope.row.seat_type_1,'上铺')">上铺</el-button>
                        <el-button size="mini" type="primary" @click="handleAdd(scope.row.carriage_number_1,scope.row.seat_type_1,'下铺')">下铺</el-button>
                    </template>
                </el-table-column>

            </el-table>
            <el-table :data="medium_seat_1">
                <el-table-column property="train_number_1" label="车次" width="100"></el-table-column>
                <el-table-column property="carriage_number_1" label="车厢号" width="100"></el-table-column>
                <el-table-column property="seat_type_1" label="座位类型" width="100"></el-table-column>
                <el-table-column property="upper_num_1" label="上铺" width="130"></el-table-column>
                <el-table-column property="middle_num_1" label="中铺" width="130"></el-table-column>
                <el-table-column property="lower_num_1" label="下铺" width="130"></el-table-column>
                <el-table-column label="操作" width="300">
                    <template slot-scope="scope">
                        <el-button size="mini" type="primary" @click="handleAdd(scope.row.carriage_number_1,scope.row.seat_type_1,'上铺')">上铺</el-button>
                        <el-button size="mini" type="primary" @click="handleAdd(scope.row.carriage_number_1,scope.row.seat_type_1,'中铺')">中铺</el-button>
                        <el-button size="mini" type="primary" @click="handleAdd(scope.row.carriage_number_1,scope.row.seat_type_1,'下铺')">下铺</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-table :data="low_seat_1">
                <el-table-column property="train_number_1" label="车次" width="100"></el-table-column>
                <el-table-column property="carriage_number_1" label="车厢号" width="70"></el-table-column>
                <el-table-column property="seat_type_1" label="座位类型" width="70"></el-table-column>
                <el-table-column property="A_num_1" label="A座" width="55"></el-table-column>
                <el-table-column property="B_num_1" label="B座" width="55"></el-table-column>
                <el-table-column property="C_num_1" label="C座" width="55"></el-table-column>
                <el-table-column property="D_num_1" label="D座" width="55"></el-table-column>
                <el-table-column property="E_num_1" label="E座" width="55"></el-table-column>
                <el-table-column property="F_num_1" label="F座" width="55"></el-table-column>
                <el-table-column label="操作" width="500">
                    <template slot-scope="scope">
                        <el-button size="mini" type="primary" @click="handleAdd(scope.row.carriage_number_1,scope.row.seat_type_1,'A')">A</el-button>
                        <el-button size="mini" type="primary" @click="handleAdd(scope.row.carriage_number_1,scope.row.seat_type_1,'B')">B</el-button>
                        <el-button size="mini" type="primary" @click="handleAdd(scope.row.carriage_number_1,scope.row.seat_type_1,'C')">C</el-button>
                        <el-button size="mini" type="primary" @click="handleAdd(scope.row.carriage_number_1,scope.row.seat_type_1,'D')">D</el-button>
                        <el-button size="mini" type="primary" @click="handleAdd(scope.row.carriage_number_1,scope.row.seat_type_1,'E')">E</el-button>
                        <el-button size="mini" type="primary" @click="handleAdd(scope.row.carriage_number_1,scope.row.seat_type_1,'F')">F</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
            <div v-show="active === 1 && dialogTableVisible_2" style="margin-top: 40px ;margin-left: 80px">
            <el-table :data="high_seat_2" >
                <el-table-column property="train_number_2" label="车次" width="100"></el-table-column>
                <el-table-column property="carriage_number_2" label="车厢号" width="100"></el-table-column>
                <el-table-column property="seat_type_2" label="座位类型" width="100"></el-table-column>
                <el-table-column property="upper_num_2" label="上铺" width="200"></el-table-column>
                <el-table-column property="lower_num_2" label="下铺" width="200"></el-table-column>
                <el-table-column label="操作" width="200">
                    <template slot-scope="scope">
                        <el-button size="mini" type="primary" @click="handleAdd_2(scope.row.carriage_number_2,scope.row.seat_type_2,'上铺')">上铺</el-button>
                        <el-button size="mini" type="primary" @click="handleAdd_2(scope.row.carriage_number_2,scope.row.seat_type_2,'下铺')">下铺</el-button>
                    </template>
                </el-table-column>

            </el-table>
            <el-table :data="medium_seat_2">
                <el-table-column property="train_number_2" label="车次" width="100"></el-table-column>
                <el-table-column property="carriage_number_2" label="车厢号" width="100"></el-table-column>
                <el-table-column property="seat_type_2" label="座位类型" width="100"></el-table-column>
                <el-table-column property="upper_num_2" label="上铺" width="130"></el-table-column>
                <el-table-column property="middle_num_2" label="中铺" width="130"></el-table-column>
                <el-table-column property="lower_num_2" label="下铺" width="130"></el-table-column>
                <el-table-column label="操作" width="300">
                    <template slot-scope="scope">
                        <el-button size="mini" type="primary" @click="handleAdd_2(scope.row.carriage_number_2,scope.row.seat_type_2,'上铺')">上铺</el-button>
                        <el-button size="mini" type="primary" @click="handleAdd_2(scope.row.carriage_number_2,scope.row.seat_type_2,'中铺')">中铺</el-button>
                        <el-button size="mini" type="primary" @click="handleAdd_2(scope.row.carriage_number_2,scope.row.seat_type_2,'下铺')">下铺</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-table :data="low_seat_2">
                <el-table-column property="train_number_2" label="车次" width="100"></el-table-column>
                <el-table-column property="carriage_number_2" label="车厢号" width="70"></el-table-column>
                <el-table-column property="seat_type_2" label="座位类型" width="70"></el-table-column>
                <el-table-column property="A_num_2" label="A座" width="55"></el-table-column>
                <el-table-column property="B_num_2" label="B座" width="55"></el-table-column>
                <el-table-column property="C_num_2" label="C座" width="55"></el-table-column>
                <el-table-column property="D_num_2" label="D座" width="55"></el-table-column>
                <el-table-column property="E_num_2" label="E座" width="55"></el-table-column>
                <el-table-column property="F_num_2" label="F座" width="55"></el-table-column>
                <el-table-column label="操作" width="500">
                    <template slot-scope="scope">
                        <el-button size="mini" type="primary" @click="handleAdd_2(scope.row.carriage_number_2,scope.row.seat_type_2,'A')">A</el-button>
                        <el-button size="mini" type="primary" @click="handleAdd_2(scope.row.carriage_number_2,scope.row.seat_type_2,'B')">B</el-button>
                        <el-button size="mini" type="primary" @click="handleAdd_2(scope.row.carriage_number_2,scope.row.seat_type_2,'C')">C</el-button>
                        <el-button size="mini" type="primary" @click="handleAdd_2(scope.row.carriage_number_2,scope.row.seat_type_2,'D')">D</el-button>
                        <el-button size="mini" type="primary" @click="handleAdd_2(scope.row.carriage_number_2,scope.row.seat_type_2,'E')">E</el-button>
                        <el-button size="mini" type="primary" @click="handleAdd_2(scope.row.carriage_number_2,scope.row.seat_type_2,'F')">F</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>


        <div v-show="active === 1 && dialogTableVisible_GD_1" style="margin-top: 40px ;margin-left: 80px;">
            <el-table :data="high_seat_GD_1">
                <el-table-column property="train_number_1" label="车次" width="100"></el-table-column>
                <el-table-column property="carriage_number_1" label="车厢号" width="100"></el-table-column>
                <el-table-column property="seat_type_1" label="座位类型" width="100"></el-table-column>
                <el-table-column property="A_num_1" label="A座" width="150"></el-table-column>
                <el-table-column property="B_num_1" label="B座" width="150"></el-table-column>
                <el-table-column property="C_num_1" label="C座" width="150"></el-table-column>
                <el-table-column label="操作" width="200">
                    <template slot-scope="scope">
                        <el-button size="mini" type="primary" @click="handleAdd(scope.row.carriage_number_1,scope.row.seat_type_1,'A')">A</el-button>
                        <el-button size="mini" type="primary" @click="handleAdd(scope.row.carriage_number_1,scope.row.seat_type_1,'B')">B</el-button>
                        <el-button size="mini" type="primary" @click="handleAdd(scope.row.carriage_number_1,scope.row.seat_type_1,'C')">C</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-table :data="medium_seat_GD_1">
                <el-table-column property="train_number_1" label="车次" width="100"></el-table-column>
                <el-table-column property="carriage_number_1" label="车厢号" width="100"></el-table-column>
                <el-table-column property="seat_type_1" label="座位类型" width="100"></el-table-column>
                <el-table-column property="A_num_1" label="A座" width="115"></el-table-column>
                <el-table-column property="B_num_1" label="B座" width="115"></el-table-column>
                <el-table-column property="C_num_1" label="C座" width="115"></el-table-column>
                <el-table-column property="D_num_1" label="D座" width="115"></el-table-column>
                <el-table-column label="操作" width="250">
                    <template slot-scope="scope">
                        <el-button size="mini" type="primary" @click="handleAdd(scope.row.carriage_number_1,scope.row.seat_type_1,'A')">A</el-button>
                        <el-button size="mini" type="primary" @click="handleAdd(scope.row.carriage_number_1,scope.row.seat_type_1,'B')">B</el-button>
                        <el-button size="mini" type="primary" @click="handleAdd(scope.row.carriage_number_1,scope.row.seat_type_1,'C')">C</el-button>
                        <el-button size="mini" type="primary" @click="handleAdd(scope.row.carriage_number_1,scope.row.seat_type_1,'D')">D</el-button>

                    </template>
                </el-table-column>
            </el-table>
            <el-table :data="low_seat_GD_1">
                <el-table-column property="train_number_1" label="车次" width="100"></el-table-column>
                <el-table-column property="carriage_number_1" label="车厢号" width="100"></el-table-column>
                <el-table-column property="seat_type_1" label="座位类型" width="100"></el-table-column>
                <el-table-column property="A_num_1" label="A座" width="90"></el-table-column>
                <el-table-column property="B_num_1" label="B座" width="90"></el-table-column>
                <el-table-column property="C_num_1" label="C座" width="90"></el-table-column>
                <el-table-column property="D_num_1" label="D座" width="90"></el-table-column>
                <el-table-column property="E_num_1" label="E座" width="90"></el-table-column>
                <el-table-column label="操作" width="300">
                    <template slot-scope="scope">
                        <el-button size="mini" type="primary" @click="handleAdd(scope.row.carriage_number_1,scope.row.seat_type_1,'A')">A</el-button>
                        <el-button size="mini" type="primary" @click="handleAdd(scope.row.carriage_number_1,scope.row.seat_type_1,'B')">B</el-button>
                        <el-button size="mini" type="primary" @click="handleAdd(scope.row.carriage_number_1,scope.row.seat_type_1,'C')">C</el-button>
                        <el-button size="mini" type="primary" @click="handleAdd(scope.row.carriage_number_1,scope.row.seat_type_1,'D')">D</el-button>
                        <el-button size="mini" type="primary" @click="handleAdd(scope.row.carriage_number_1,scope.row.seat_type_1,'E')">E</el-button>

                    </template>
                </el-table-column>
            </el-table>
        </div>
            <div v-show="active === 1 && dialogTableVisible_GD_2" style="margin-top: 40px ;margin-left: 80px;">
            <el-table :data="high_seat_GD_2">
                <el-table-column property="train_number_2" label="车次" width="100"></el-table-column>
                <el-table-column property="carriage_number_2" label="车厢号" width="100"></el-table-column>
                <el-table-column property="seat_type_2" label="座位类型" width="100"></el-table-column>
                <el-table-column property="A_num_2" label="A座" width="150"></el-table-column>
                <el-table-column property="B_num_2" label="B座" width="150"></el-table-column>
                <el-table-column property="C_num_2" label="C座" width="150"></el-table-column>
                <el-table-column label="操作" width="200">
                    <template slot-scope="scope">
                        <el-button size="mini" type="primary" @click="handleAdd_2(scope.row.carriage_number_2,scope.row.seat_type_2,'A')">A</el-button>
                        <el-button size="mini" type="primary" @click="handleAdd_2(scope.row.carriage_number_2,scope.row.seat_type_2,'B')">B</el-button>
                        <el-button size="mini" type="primary" @click="handleAdd_2(scope.row.carriage_number_2,scope.row.seat_type_2,'C')">C</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-table :data="medium_seat_GD_2">
                <el-table-column property="train_number_2" label="车次" width="100"></el-table-column>
                <el-table-column property="carriage_number_2" label="车厢号" width="100"></el-table-column>
                <el-table-column property="seat_type_2" label="座位类型" width="100"></el-table-column>
                <el-table-column property="A_num_2" label="A座" width="115"></el-table-column>
                <el-table-column property="B_num_2" label="B座" width="115"></el-table-column>
                <el-table-column property="C_num_2" label="C座" width="115"></el-table-column>
                <el-table-column property="D_num_2" label="D座" width="115"></el-table-column>
                <el-table-column label="操作" width="250">
                    <template slot-scope="scope">
                        <el-button size="mini" type="primary" @click="handleAdd_2(scope.row.carriage_number_2,scope.row.seat_type_2,'A')">A</el-button>
                        <el-button size="mini" type="primary" @click="handleAdd_2(scope.row.carriage_number_2,scope.row.seat_type_2,'B')">B</el-button>
                        <el-button size="mini" type="primary" @click="handleAdd_2(scope.row.carriage_number_2,scope.row.seat_type_2,'C')">C</el-button>
                        <el-button size="mini" type="primary" @click="handleAdd_2(scope.row.carriage_number_2,scope.row.seat_type_2,'D')">D</el-button>

                    </template>
                </el-table-column>
            </el-table>
            <el-table :data="low_seat_GD_2">
                <el-table-column property="train_number_2" label="车次" width="100"></el-table-column>
                <el-table-column property="carriage_number_2" label="车厢号" width="100"></el-table-column>
                <el-table-column property="seat_type_2" label="座位类型" width="100"></el-table-column>
                <el-table-column property="A_num_2" label="A座" width="90"></el-table-column>
                <el-table-column property="B_num_2" label="B座" width="90"></el-table-column>
                <el-table-column property="C_num_2" label="C座" width="90"></el-table-column>
                <el-table-column property="D_num_2" label="D座" width="90"></el-table-column>
                <el-table-column property="E_num_2" label="E座" width="90"></el-table-column>
                <el-table-column label="操作" width="300">
                    <template slot-scope="scope">
                        <el-button size="mini" type="primary" @click="handleAdd_2(scope.row.carriage_number_2,scope.row.seat_type_2,'A')">A</el-button>
                        <el-button size="mini" type="primary" @click="handleAdd_2(scope.row.carriage_number_2,scope.row.seat_type_2,'B')">B</el-button>
                        <el-button size="mini" type="primary" @click="handleAdd_2(scope.row.carriage_number_2,scope.row.seat_type_2,'C')">C</el-button>
                        <el-button size="mini" type="primary" @click="handleAdd_2(scope.row.carriage_number_2,scope.row.seat_type_2,'D')">D</el-button>
                        <el-button size="mini" type="primary" @click="handleAdd_2(scope.row.carriage_number_2,scope.row.seat_type_2,'E')">E</el-button>

                    </template>
                </el-table-column>
            </el-table>

        </div>

        <el-row  v-show="active === 0" >
            <div >


                <el-card class="box-card"  v-for="(tableData)  in tableDatas" style="width: 1000px;margin-left: 80px;margin-top: 20px">
                    <div slot="header" class="clearfix">
                        <span>{{tableData.passenger_real_name}}</span>
                        <el-button style="float: right; padding: 3px 0"  @click="AddPassengerInfo(tableData.passenger_real_name,tableData.passenger_phone_number,tableData.passenger_id_number)" type="text">添加</el-button>
                    </div>
                    <div  class="text item">
                        <span>电话号码：</span><span>{{tableData.passenger_phone_number}}</span>
                    </div>
                    <div v-if="tableData.passenger_type == 1 " class="text item">
                        <span>用户类型：</span><span>成人</span>
                    </div>
                    <div  v-else class="text item">
                        <span>用户类型：</span><span>学生</span>
                    </div>
                    <div  class="text item">
                        <span>身份证号：</span><span>{{tableData.passenger_id_number}}</span>
                    </div>
                    <div  class="text item">
                        <span>地址：</span><span>{{tableData.passenger_address}}</span>
                    </div>

                </el-card>
            </div>
        </el-row>
        <el-row  v-show="active === 2" >
            <el-table :data="passenger_data" v-show="show_order_list" style="width: 1000px;margin-left: 80px;margin-top: 20px">
                <el-table-column property="order_id" label="订单号" ></el-table-column>
                <el-table-column property="passenger_real_name" label="乘客姓名" ></el-table-column>
                <el-table-column property="passenger_phone_number" label="乘客电话号码" ></el-table-column>
                <el-table-column property="passenger_id_number" label="身份证号"></el-table-column>
                <el-table-column property="train_number" label="车次"></el-table-column>
                <el-table-column property="carriage_no" label="车厢号"></el-table-column>
                <el-table-column property="seat_type" label="座位类型"></el-table-column>
                <el-table-column property="seat_no" label="座位号"></el-table-column>
                <el-table-column property="seat_price" label="订单金额"></el-table-column>
            </el-table>
            <el-table :data="passenger_data_2" v-show="show_order_list_2" style="width: 1000px;margin-left: 80px;margin-top: 20px">
                <el-table-column property="order_id" label="订单号" ></el-table-column>
                <el-table-column property="passenger_real_name" label="乘客姓名" ></el-table-column>
                <el-table-column property="passenger_phone_number" label="乘客电话号码" ></el-table-column>
                <el-table-column property="passenger_id_number" label="身份证号"></el-table-column>
                <el-table-column property="train_number" label="车次"></el-table-column>
                <el-table-column property="carriage_no" label="车厢号"></el-table-column>
                <el-table-column property="seat_type" label="座位类型"></el-table-column>
                <el-table-column property="seat_no" label="座位号"></el-table-column>
                <el-table-column property="seat_price" label="订单金额"></el-table-column>
            </el-table>
            <el-row style="margin-top: 20px">

                <el-button type="primary" @click="dialogFormVisible_wx = true" style="margin-left: 300px">微信支付</el-button>


                <el-button type="primary" @click="dialogFormVisible_zfb = true" style="margin-left: 300px">支付宝支付</el-button>

            </el-row>
            <el-button type="primary" @click="pay_success()"  style="margin-left: 500px">支付成功</el-button>

            <el-dialog title="微信支付" :visible.sync="dialogFormVisible_wx">
                <el-image
                    style="width: 300px; height: 500px ;"
                    :src="url1"
                    :fit="fit"></el-image>
            </el-dialog>
            <el-dialog title="支付宝支付" :visible.sync="dialogFormVisible_zfb">
                <el-image
                    style="width: 300px; height: 500px"
                    :src="url2"
                    :fit="fit"></el-image>
            </el-dialog>

        </el-row>
        <el-row   v-show="active === 3" >
            <div style="margin-top: 30px; margin-left: 50px;margin-right: 50px">
                <el-alert
                    title="恭喜您支付成功，请在未出行订单列表中查看"
                    type="success"
                    effect="dark">
                </el-alert>
            </div>
        </el-row>

        <el-button type="primary" round @click="next" style="margin-left: 500px;margin-top: 30px">下一步</el-button>
    </div>
</template>


<script>
    import headTop from '../components/headTop'
    import {queryTrainTicketNum,getPassengerInfo,orderTrainTicket,getOrderList,paySuccess} from '@/api/getData';
    import {setCookie,getCookie} from "../config/store_cookie";
    export default {
        name: "TicketOrder",
        data() {
            return {

                url2:"https://40964096.xyz/zhifubao.jpg",
                url1:"https://40964096.xyz/weixin.jpg",
                active:0,
                dialogTableVisible_1: false,
                dialogTableVisible_GD_1: false,
                dialogTableVisible_GD_2:false,
                dialogTableVisible_2:false,
                show_passenger:false,
                show_passenger_ticket:false,
                show_order_list:false,
                passenger_count:0,
                passenger_count_2:0,
                high_seat_1:[],
                medium_seat_1:[],
                low_seat_1:[],
                high_seat_GD_1:[],
                medium_seat_GD_1:[],
                low_seat_GD_1:[],
                high_seat_2:[],
                medium_seat_2:[],
                low_seat_2:[],
                high_seat_GD_2:[],
                medium_seat_GD_2:[],
                low_seat_GD_2:[],
                tableDatas:[],
                passenger_data:
                    [],
                passenger_data_2:
                    [],
                ticket_data: [],
                dialogFormVisible_wx:false,
                dialogFormVisible_zfb:false,
                datetime: "",
                train_no_1: "",
                train_number_1:"",
                high_seat_price_1:"",
                medium_seat_price_1:"",
                low_seat_price_1:"",
                start_station_no:"",
                transfer_station_no_1:"",
                transfer_station_no_2:"",
                end_station_no:"",
                train_no_2: "",
                train_number_2:"",
                high_seat_price_2:"",
                medium_seat_price_2:"",
                low_seat_price_2:"",
                show_passenger_ticket_2:"",
                show_order_list_2:false,
            };
        },

        methods: {
            next() {
                this.active ++;
                if(this.active == 1)
                {
                    this.getTicketCount();
                }
                if(this.active == 2)
                {
                    this.getOrderList();
                }
                if(this.active == 4)
                {
                    this.$router.push('AllOrderList');
                }
            },
            async getTicketCount() {
                const res = await queryTrainTicketNum({
                    datetime: this.datetime,
                    train_no: this.train_no_1,
                    start_no: this.start_station_no,
                    end_no: this.transfer_station_no_1,
                    train_number: this.train_number_1
                })
                if (res.status == 1) {
                    if (this.train_number_1[0] == "G" || this.train_number_1[0] == "D") {
                        this.high_seat_GD_1 = [];
                        this.medium_seat_GD_1 = [];
                        this.low_seat_GD_1 = [];
                        for (let i = 0; i < res.trainRemainingSeats_gds.length; i++) {
                            if (res.trainRemainingSeats_gds[i].seat_type == "特等座") {
                                let high_temp = {};
                                high_temp.train_number_1 = this.train_number_1;
                                high_temp.carriage_number_1 = res.trainRemainingSeats_gds[i].carriage_no;
                                high_temp.seat_type_1 = res.trainRemainingSeats_gds[i].seat_type;
                                high_temp.A_num_1 = res.trainRemainingSeats_gds[i].high_seat_GD_A;
                                high_temp.B_num_1 = res.trainRemainingSeats_gds[i].high_seat_GD_B;
                                high_temp.C_num_1 = res.trainRemainingSeats_gds[i].high_seat_GD_C;
                                this.high_seat_GD_1.push(high_temp);
                            }
                            if (res.trainRemainingSeats_gds[i].seat_type == "一等座") {
                                let high_temp = {};
                                high_temp.train_number_1 = this.train_number_1;
                                high_temp.carriage_number_1 = res.trainRemainingSeats_gds[i].carriage_no;
                                high_temp.seat_type_1 = res.trainRemainingSeats_gds[i].seat_type;
                                high_temp.A_num_1 = res.trainRemainingSeats_gds[i].medium_seat_GD_A;
                                high_temp.B_num_1 = res.trainRemainingSeats_gds[i].medium_seat_GD_B;
                                high_temp.C_num_1 = res.trainRemainingSeats_gds[i].medium_seat_GD_C;
                                high_temp.D_num_1 = res.trainRemainingSeats_gds[i].medium_seat_GD_D;
                                this.medium_seat_GD_1.push(high_temp);
                            }
                            if (res.trainRemainingSeats_gds[i].seat_type == "二等座") {
                                let high_temp = {};
                                high_temp.train_number_1 = this.train_number_1;
                                high_temp.carriage_number_1 = res.trainRemainingSeats_gds[i].carriage_no;
                                high_temp.seat_type_1 = res.trainRemainingSeats_gds[i].seat_type;
                                high_temp.A_num_1 = res.trainRemainingSeats_gds[i].low_seat_GD_A;
                                high_temp.B_num_1 = res.trainRemainingSeats_gds[i].low_seat_GD_B;
                                high_temp.C_num_1 = res.trainRemainingSeats_gds[i].low_seat_GD_C;
                                high_temp.D_num_1 = res.trainRemainingSeats_gds[i].low_seat_GD_D;
                                high_temp.E_num_1 = res.trainRemainingSeats_gds[i].low_seat_GD_E;
                                this.low_seat_GD_1.push(high_temp);
                            }
                        }
                        this.dialogTableVisible_GD_1 = true

                    }
                    else {
                        this.high_seat_1 = []
                        this.medium_seat_1 = []
                        this.low_seat_1 = []
                        for (let i = 0; i < res.trainRemainingSeats.length; i++) {
                            if (res.trainRemainingSeats[i].seat_type == "软卧") {
                                let high_temp = {};
                                high_temp.train_number_1 = this.train_number_1;
                                high_temp.carriage_number_1 = res.trainRemainingSeats[i].carriage_no;
                                high_temp.seat_type_1 = res.trainRemainingSeats[i].seat_type;
                                high_temp.upper_num_1 = res.trainRemainingSeats[i].high_seat_upper;
                                high_temp.lower_num_1 = res.trainRemainingSeats[i].high_seat_lower;
                                this.high_seat_1.push(high_temp);
                            }
                            if (res.trainRemainingSeats[i].seat_type == "硬卧") {
                                let high_temp = {};
                                high_temp.train_number_1 = this.train_number_1;
                                high_temp.carriage_number_1 = res.trainRemainingSeats[i].carriage_no;
                                high_temp.seat_type_1 = res.trainRemainingSeats[i].seat_type;
                                high_temp.upper_num_1 = res.trainRemainingSeats[i].medium_seat_upper;
                                high_temp.middle_num_1 = res.trainRemainingSeats[i].medium_seat_middle;
                                high_temp.lower_num_1 = res.trainRemainingSeats[i].medium_seat_lower;
                                this.medium_seat_1.push(high_temp);
                            }
                            if (res.trainRemainingSeats[i].seat_type == "硬坐") {
                                let high_temp = {};
                                high_temp.train_number_1 = this.train_number_1;
                                high_temp.carriage_number_1 = res.trainRemainingSeats[i].carriage_no;
                                high_temp.seat_type_1 = "硬座";
                                high_temp.A_num_1 = res.trainRemainingSeats[i].low_seat_A;
                                high_temp.B_num_1 = res.trainRemainingSeats[i].low_seat_B;
                                high_temp.C_num_1 = res.trainRemainingSeats[i].low_seat_C;
                                high_temp.D_num_1 = res.trainRemainingSeats[i].low_seat_D;
                                high_temp.E_num_1 = res.trainRemainingSeats[i].low_seat_E;
                                high_temp.F_num_1 = res.trainRemainingSeats[i].low_seat_F;
                                this.low_seat_1.push(high_temp);
                            }
                        }
                        this.dialogTableVisible_1 = true
                    }

                    const res_2 = await queryTrainTicketNum({
                        datetime: this.datetime,
                        train_no: this.train_no_2,
                        start_no: this.transfer_station_no_2,
                        end_no: this.end_station_no,
                        train_number: this.train_number_2
                    })
                    if (res_2.status == 1) {
                        if (this.train_number_2[0] == "G" || this.train_number_2[0] == "D") {
                            this.high_seat_GD_2 = [];
                            this.medium_seat_GD_2 = [];
                            this.low_seat_GD_2 = [];
                            for (let i = 0; i < res_2.trainRemainingSeats_gds.length; i++) {
                                if (res_2.trainRemainingSeats_gds[i].seat_type == "特等座") {
                                    let high_temp = {};
                                    high_temp.train_number_2 = this.train_number_2;
                                    high_temp.carriage_number_2 = res_2.trainRemainingSeats_gds[i].carriage_no;
                                    high_temp.seat_type_2 = res_2.trainRemainingSeats_gds[i].seat_type;
                                    high_temp.A_num_2 = res_2.trainRemainingSeats_gds[i].high_seat_GD_A;
                                    high_temp.B_num_2 = res_2.trainRemainingSeats_gds[i].high_seat_GD_B;
                                    high_temp.C_num_2 = res_2.trainRemainingSeats_gds[i].high_seat_GD_C;
                                    this.high_seat_GD_2.push(high_temp);
                                }
                                if (res_2.trainRemainingSeats_gds[i].seat_type == "一等座") {
                                    let high_temp = {};
                                    high_temp.train_number_2 = this.train_number_2;
                                    high_temp.carriage_number_2 = res_2.trainRemainingSeats_gds[i].carriage_no;
                                    high_temp.seat_type_2 = res_2.trainRemainingSeats_gds[i].seat_type;
                                    high_temp.A_num_2 = res_2.trainRemainingSeats_gds[i].medium_seat_GD_A;
                                    high_temp.B_num_2 = res_2.trainRemainingSeats_gds[i].medium_seat_GD_B;
                                    high_temp.C_num_2 = res_2.trainRemainingSeats_gds[i].medium_seat_GD_C;
                                    high_temp.D_num_2 = res_2.trainRemainingSeats_gds[i].medium_seat_GD_D;
                                    this.medium_seat_GD_2.push(high_temp);
                                }
                                if (res_2.trainRemainingSeats_gds[i].seat_type == "二等座") {
                                    let high_temp = {};
                                    high_temp.train_number_2 = this.train_number_2;
                                    high_temp.carriage_number_2 = res_2.trainRemainingSeats_gds[i].carriage_no;
                                    high_temp.seat_type_2 = res_2.trainRemainingSeats_gds[i].seat_type;
                                    high_temp.A_num_2 = res_2.trainRemainingSeats_gds[i].low_seat_GD_A;
                                    high_temp.B_num_2 = res_2.trainRemainingSeats_gds[i].low_seat_GD_B;
                                    high_temp.C_num_2 = res_2.trainRemainingSeats_gds[i].low_seat_GD_C;
                                    high_temp.D_num_2 = res_2.trainRemainingSeats_gds[i].low_seat_GD_D;
                                    high_temp.E_num_2 = res_2.trainRemainingSeats_gds[i].low_seat_GD_E;
                                    this.low_seat_GD_2.push(high_temp);
                                }
                            }
                            this.dialogTableVisible_GD_2 = true

                        }
                        else {
                            this.high_seat_2 = []
                            this.medium_seat_2 = []
                            this.low_seat_2 = []
                            for (let i = 0; i < res_2.trainRemainingSeats.length; i++) {
                                if (res_2.trainRemainingSeats[i].seat_type == "软卧") {
                                    let high_temp = {};
                                    high_temp.train_number_2 = this.train_number_2;
                                    high_temp.carriage_number_2 = res_2.trainRemainingSeats[i].carriage_no;
                                    high_temp.seat_type_2 = res_2.trainRemainingSeats[i].seat_type;
                                    high_temp.upper_num_2 = res_2.trainRemainingSeats[i].high_seat_upper;
                                    high_temp.lower_num_2 = res_2.trainRemainingSeats[i].high_seat_lower;
                                    this.high_seat_2.push(high_temp);
                                }
                                if (res_2.trainRemainingSeats[i].seat_type == "硬卧") {
                                    let high_temp = {};
                                    high_temp.train_number_2 = this.train_number_2;
                                    high_temp.carriage_number_2 = res_2.trainRemainingSeats[i].carriage_no;
                                    high_temp.seat_type_2 = res_2.trainRemainingSeats[i].seat_type;
                                    high_temp.upper_num_2 = res_2.trainRemainingSeats[i].medium_seat_upper;
                                    high_temp.middle_num_2 = res_2.trainRemainingSeats[i].medium_seat_middle;
                                    high_temp.lower_num_2 = res_2.trainRemainingSeats[i].medium_seat_lower;
                                    this.medium_seat_2.push(high_temp);
                                }
                                if (res_2.trainRemainingSeats[i].seat_type == "硬坐") {
                                    let high_temp = {};
                                    high_temp.train_number_2 = this.train_number_2;
                                    high_temp.carriage_number_2 = res_2.trainRemainingSeats[i].carriage_no;
                                    high_temp.seat_type_2 = "硬座";
                                    high_temp.A_num_2 = res_2.trainRemainingSeats[i].low_seat_A;
                                    high_temp.B_num_2 = res_2.trainRemainingSeats[i].low_seat_B;
                                    high_temp.C_num_2 = res_2.trainRemainingSeats[i].low_seat_C;
                                    high_temp.D_num_2 = res_2.trainRemainingSeats[i].low_seat_D;
                                    high_temp.E_num_2 = res_2.trainRemainingSeats[i].low_seat_E;
                                    high_temp.F_num_2 = res_2.trainRemainingSeats[i].low_seat_F;
                                    this.low_seat_2.push(high_temp);
                                }
                            }
                            this.dialogTableVisible_2 = true
                        }
                        this.$message({
                            type: 'message',
                            message: '查询成功'
                        });
                    }
                    else if (res.status == 404) {
                        this.$message({
                            type: 'error',
                            message: '请输入正确时间'
                        });
                    }
                    else {
                        this.$message({
                            type: 'error',
                            message: '查询失败'
                        });
                    }
                }
            },
            async getPassenger()
            {
                const PassengerInfoData = await getPassengerInfo({token:getCookie("token")})
                if (
                    PassengerInfoData.status == 1) {
                    this.$message({
                        type: 'success',
                        message: '成功'
                    });
                    this.tableDatas = PassengerInfoData.passengerInfos;
                    console.log(this.tableDatas)
                }else{
                    this.$message({
                        type: 'error',
                        message: res.success
                    });
                }
            },
            AddPassengerInfo(passenger_real_name,passenger_phone_number,passenger_id_number)
            {
                let passenger_d = {};
                passenger_d.passenger_real_name = passenger_real_name;
                passenger_d.passenger_phone_number = passenger_phone_number;
                passenger_d.passenger_id_number = passenger_id_number;
                let passenger_d_2 = {}
                passenger_d_2.passenger_real_name = passenger_real_name;
                passenger_d_2.passenger_phone_number = passenger_phone_number;
                passenger_d_2.passenger_id_number = passenger_id_number;
                this.passenger_data.push(passenger_d);
                this.passenger_data_2.push(passenger_d_2)
                this.passenger_count ++;
                this.passenger_count_2 ++;
                this.$message({
                    message: '当前添加了'+this.passenger_count+"位乘客",
                    type: 'success'
                });
                this.show_passenger = true;
            },
            async handleAdd(carriage_no,seat_type,seat_number)
            {
                if(this.passenger_count >0)
                {

                    console.log(this.train_no_2+"    "+this.train_no_1);
                    let passenger_phone_number = this.passenger_data[this.passenger_count-1].passenger_phone_number;
                    let passenger_id_number =  this.passenger_data[this.passenger_count-1].passenger_id_number;
                    const res = await orderTrainTicket({token:getCookie("token"),datetime:this.datetime,train_no:this.train_no_1,start_no:this.start_station_no,
                        end_no:this.transfer_station_no_1,train_number:this.train_number_1,carriage_no:carriage_no,seat_type:seat_type,seat_number:seat_number,
                        passenger_phone_number:passenger_phone_number,passenger_id_number:passenger_id_number, high_seat_price: this.high_seat_price_1,
                        medium_seat_price:this.medium_seat_price_1,low_seat_price :this.low_seat_price_1});
                    if(res.status ==1)
                    {
                        if(passenger_phone_number == res.passenger_phone_number)
                        {
                            this.passenger_data[this.passenger_count-1].carriage_no = res.carriage_no;
                            this.passenger_data[this.passenger_count-1].seat_type = res.seat_type;
                            this.passenger_data[this.passenger_count-1].seat_no = res.result_seat_no;
                            this.passenger_data[this.passenger_count-1].train_number = this.train_number_1;
                            this.$message({
                                message: '乘客'+ this.passenger_data[this.passenger_count-1].passenger_real_name+'选座成功',
                                type: 'success'
                            });
                        }
                    }
                    this.passenger_count --;
                    if( this.passenger_count  == 0 )
                    {
                        this.show_passenger = false;
                        this.show_passenger_ticket = true;
                    }

                }

            },
            async handleAdd_2(carriage_no,seat_type,seat_number)
            {
                if(this.passenger_count_2 >0)
                {

                    console.log(this.train_no_2+"    "+this.train_no_1);
                    let passenger_phone_number = this.passenger_data_2[this.passenger_count_2-1].passenger_phone_number;
                    let passenger_id_number =  this.passenger_data_2[this.passenger_count_2-1].passenger_id_number;
                    const res2 = await orderTrainTicket({token:getCookie("token"),datetime:this.datetime,train_no:this.train_no_2,start_no:this.transfer_station_no_2,
                    end_no:this.end_station_no,train_number:this.train_number_2,carriage_no:carriage_no,seat_type:seat_type,seat_number:seat_number,
                    passenger_phone_number:passenger_phone_number,passenger_id_number:passenger_id_number, high_seat_price: this.high_seat_price_2,
                    medium_seat_price:this.medium_seat_price_2,low_seat_price :this.low_seat_price_2});
                    if(res2.status ==1)
                    {
                        if(passenger_phone_number == res2.passenger_phone_number)
                        {
                            this.passenger_data_2[this.passenger_count_2-1].carriage_no = res2.carriage_no;
                            this.passenger_data_2[this.passenger_count_2-1].seat_type = res2.seat_type;
                            this.passenger_data_2[this.passenger_count_2-1].seat_no = res2.result_seat_no;
                            this.passenger_data_2[this.passenger_count_2-1].train_number = this.train_number_2;
                            this.$message({
                                message: '乘客'+ this.passenger_data_2[this.passenger_count_2-1].passenger_real_name+'选座成功',
                                type: 'success'
                            });
                        }
                    }
                    this.passenger_count_2 --;
                    if( this.passenger_count_2  == 0 )
                    {
                        this.show_passenger = false;
                        this.show_passenger_ticket_2 = true;
                    }

                }
            },


            deletepassenger(passenger_phone_number)
            {
                for(let i = 0 ; i<this.passenger_data.length ; i++)
                {
                    if(this.passenger_data[i].passenger_phone_number == passenger_phone_number)
                    {
                        this.passenger_data.splice(i,1);
                    }
                }
                this.passenger_count --;
            },
            async getOrderList()
            {

                const res = await getOrderList({token:getCookie("token"),datetime:this.datetime,train_no:this.train_no_1,start_no:this.start_station_no,
                    end_no:this.transfer_station_no_1});
                if(res.status == 1)
                {
                    for(let i = 0 ; i< res.getOrderListList.length ; i++)
                    {
                        for(let j = 0 ; j < this.passenger_data.length ; j++)
                        {

                            if(res.getOrderListList[i].passenger_phone_number == this.passenger_data[j].passenger_phone_number &&
                                res.getOrderListList[i].passenger_id_number == this.passenger_data[j].passenger_id_number)
                            {
                                this.passenger_data[j].order_id =  res.getOrderListList[i].order_id;
                                for(let k = 0 ; k < this.tableDatas.length ; k++)
                                {
                                    if(this.tableDatas[k].passenger_phone_number ==  this.passenger_data[j].passenger_phone_number)
                                    {
                                        if(this.tableDatas[k].passenger_type == 1)
                                        {
                                            if( this.passenger_data[j].seat_type == "二等座" )
                                            {

                                                this.passenger_data[j].seat_price = this.low_seat_price_1;
                                            }
                                            if( this.passenger_data[j].seat_type == "一等座" )
                                            {
                                                this.passenger_data[j].seat_price = this.medium_seat_price_1;
                                            }
                                            if( this.passenger_data[j].seat_type == "特等座" )
                                            {
                                                this.passenger_data[j].seat_price = this.high_seat_price_1;
                                            }
                                            if( this.passenger_data[j].seat_type == "硬座" )
                                            {
                                                this.passenger_data[j].seat_price = this.low_seat_price_1;
                                            }
                                            if( this.passenger_data[j].seat_type == "硬卧" )
                                            {
                                                this.passenger_data[j].seat_price = this.medium_seat_price_1;
                                            }
                                            if( this.passenger_data[j].seat_type == "软卧" )
                                            {
                                                this.passenger_data[j].seat_price = this.high_seat_price_1;
                                            }
                                        }
                                        else
                                        {
                                            if( this.passenger_data[j].seat_type == "二等座" )
                                            {

                                                this.passenger_data[j].seat_price =  parseInt(this.low_seat_price_1.substring(1,this.low_seat_price_1.length)) *0.75;
                                                console.log(this.low_seat_price)
                                            }
                                            if( this.passenger_data[j].seat_type == "一等座" )
                                            {
                                                this.passenger_data[j].seat_price =  parseInt(this.medium_seat_price_1.substring(1,this.medium_seat_price_1.length)) *0.75;
                                            }
                                            if( this.passenger_data[j].seat_type == "特等座" )
                                            {
                                                this.passenger_data[j].seat_price = parseInt(this.high_seat_price_1.substring(1,this.high_seat_price_1.length)) *0.75;
                                            }
                                            if( this.passenger_data[j].seat_type == "硬座" )
                                            {
                                                this.passenger_data[j].seat_price = parseInt(this.low_seat_price_1.substring(1,this.low_seat_price_1.length)) *0.5;
                                            }
                                            if( this.passenger_data[j].seat_type == "硬卧" )
                                            {
                                                this.passenger_data[j].seat_price = parseInt(this.medium_seat_price_1.substring(1,this.medium_seat_price_1.length)) *0.5;
                                            }
                                            if( this.passenger_data[j].seat_type == "软卧" )
                                            {
                                                this.passenger_data[j].seat_price = parseInt(this.high_seat_price_1.substring(1,this.high_seat_price_1.length))*0.5;
                                            }
                                        }
                                    }
                                }

                            }
                        }
                    }
                    this.show_passenger_ticket = false;
                    this.show_order_list = true;
                    this.$message({
                        message: '请支付您的订单',
                        type: 'success'
                    });
                }
                else
                {
                    this.$message({
                        message: '获取订单列表失败',
                        type: 'danger'
                    });
                }
                console.log(this.passenger_data)
                const res2 = await getOrderList({token:getCookie("token"),datetime:this.datetime,train_no:this.train_no_2,start_no:this.transfer_station_no_2,
                    end_no:this.end_station_no});
                if(res2.status == 1)
                {
                    for(let i = 0 ; i< res2.getOrderListList.length ; i++)
                    {
                        for(let j = 0 ; j < this.passenger_data_2.length ; j++)
                        {

                            if(res2.getOrderListList[i].passenger_phone_number == this.passenger_data_2[j].passenger_phone_number &&
                                res2.getOrderListList[i].passenger_id_number == this.passenger_data_2[j].passenger_id_number)
                            {
                                this.passenger_data_2[j].order_id =  res2.getOrderListList[i].order_id;
                                for(let k = 0 ; k < this.tableDatas.length ; k++)
                                {
                                    if(this.tableDatas[k].passenger_phone_number ==  this.passenger_data_2[j].passenger_phone_number)
                                    {
                                        if(this.tableDatas[k].passenger_type == 1)
                                        {
                                            if( this.passenger_data_2[j].seat_type == "二等座" )
                                            {

                                                this.passenger_data_2[j].seat_price = this.low_seat_price_2;
                                            }
                                            if( this.passenger_data_2[j].seat_type == "一等座" )
                                            {
                                                this.passenger_data_2[j].seat_price = this.medium_seat_price_2;
                                            }
                                            if( this.passenger_data_2[j].seat_type == "特等座" )
                                            {
                                                this.passenger_data_2[j].seat_price = this.high_seat_price_2;
                                            }
                                            if( this.passenger_data_2[j].seat_type == "硬座" )
                                            {
                                                this.passenger_data_2[j].seat_price = this.low_seat_price_2;
                                            }
                                            if( this.passenger_data_2[j].seat_type == "硬卧" )
                                            {
                                                this.passenger_data_2[j].seat_price = this.medium_seat_price_2;
                                            }
                                            if( this.passenger_data_2[j].seat_type == "软卧" )
                                            {
                                                this.passenger_data_2[j].seat_price = this.high_seat_price_2;
                                            }
                                        }
                                        else
                                        {
                                            if( this.passenger_data_2[j].seat_type == "二等座" )
                                            {

                                                this.passenger_data_2[j].seat_price =  parseInt(this.low_seat_price_2.substring(1,this.low_seat_price_2.length)) *0.75;
                                            }
                                            if( this.passenger_data_2[j].seat_type == "一等座" )
                                            {
                                                this.passenger_data_2[j].seat_price =  parseInt(this.medium_seat_price_2.substring(1,this.medium_seat_price_2.length)) *0.75;
                                            }
                                            if( this.passenger_data_2[j].seat_type == "特等座" )
                                            {
                                                this.passenger_data_2[j].seat_price = parseInt(this.high_seat_price_2.substring(1,this.high_seat_price_2.length)) *0.75;
                                            }
                                            if( this.passenger_data_2[j].seat_type == "硬座" )
                                            {
                                                this.passenger_data_2[j].seat_price = parseInt(this.low_seat_price_2.substring(1,this.low_seat_price_2.length)) *0.5;
                                            }
                                            if( this.passenger_data_2[j].seat_type == "硬卧" )
                                            {
                                                this.passenger_data_2[j].seat_price = parseInt(this.medium_seat_price_2.substring(1,this.medium_seat_price_2.length)) *0.5;
                                            }
                                            if( this.passenger_data_2[j].seat_type == "软卧" )
                                            {
                                                this.passenger_data_2[j].seat_price = parseInt(this.high_seat_price_2.substring(1,this.high_seat_price_2.length))*0.5;
                                            }
                                        }
                                    }
                                }

                            }
                        }
                    }
                    this.show_passenger_ticket_2 = false;
                    this.show_order_list_2 = true;
                    this.$message({
                        message: '请支付您的订单',
                        type: 'success'
                    });
                }
                else
                {
                    this.$message({
                        message: '获取订单列表失败',
                        type: 'danger'
                    });
                }
                console.log(this.passenger_data_2)
            },
            async  pay_success()
            {
                var order_id_list = "";
                for(let i = 0 ; i < this.passenger_data.length ; i++)
                {
                    order_id_list = order_id_list+this.passenger_data[i].order_id +",";
                }


                const res = await  paySuccess({token:getCookie("token"),datetime:this.datetime,train_no:this.train_no_1,start_no:this.start_station_no,
                    end_no:this.transfer_station_no_1,order_list:order_id_list});
                let order_id_list_2 = ""
                for(let i = 0 ; i < this.passenger_data_2.length ; i++)
                {
                    order_id_list_2 = order_id_list_2+this.passenger_data_2[i].order_id +",";
                }


                const res2 = await  paySuccess({token:getCookie("token"),datetime:this.datetime,train_no:this.train_no_2,start_no:this.transfer_station_no_2,
                    end_no:this.end_station_no,order_list:order_id_list_2});
                if(res.status == 1 && res2.status == 1)
                {
                    this.$message({
                        message: res.success,
                        type: 'success'
                    });
                    this.next();
                }
                else
                {
                    this.$message({
                        message: "支付失败",
                        type: 'danger'
                    });
                }
            }

        },
        components: {
            headTop,
        },
        created(){
            if(this.$route.query.datetime == null || this.$route.query.train_no_1 == null)

            {
                this.$message({
                    message: '请先选择列车',
                    type: 'warning'
                });
            }else

            {
                this.datetime = this.$route.query.datetime;
                this.train_no_1= this.$route.query.train_no_1;
                this.train_number_1 = this.$route.query.train_number_1;
                this.high_seat_price_1= this.$route.query.high_seat_price_1;
                this.medium_seat_price_1= this.$route.query.medium_seat_price_1;
                this.low_seat_price_1= this.$route.query.low_seat_price_1;
                this.start_station_no = this.$route.query.start_station_no;
                this.transfer_station_no_1=this.$route.query.transfer_station_no_1;
                this. transfer_station_no_2 =this.$route.query.transfer_station_no_2;
                this. end_station_no =this.$route.query.end_station_no;
                this.train_no_2 =this.$route.query.train_no_2;
                this.train_number_2 =this.$route.query.train_number_2;
                this.high_seat_price_2 =this.$route.query.high_seat_price_2;
                this.medium_seat_price_2 =this.$route.query.medium_seat_price_2;
                this.low_seat_price_2 =this.$route.query.low_seat_price_2;
                console.log(this.train_no_2+"    "+this.train_no_1);
            }



        },

        mounted() {
            this.getPassenger();
        }


    }
</script>

<style lang="less">
    @import '../style/mixin';
    .explain_text{
        margin-top: 20px;
        text-align: center;
        font-size: 20px;
        color: #333;
    }
    .admin_set{
        width: 60%;
        background-color: #F9FAFC;
        min-height: 400px;
        margin: 20px auto 0;
        border-radius: 10px;
        ul > li{
            padding: 20px;
            span{
                color: #666;
            }
        }
    }
    .admin_title{
        margin-top: 20px;
        .sc(24px, #666);
        text-align: center;
    }
    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        margin-top: 10px;
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
    .text {
        font-size: 14px;
    }

    .item {
        margin-bottom: 18px;
    }

    .clearfix:before,
    .clearfix:after {
        display: table;
        content: "";
    }
    .clearfix:after {
        clear: both
    }

    .box-card {
        width: 480px;
    }
</style>
