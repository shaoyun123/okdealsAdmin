<template>
  <div>
    <el-card class="box-card">
      <div class="line">
        <el-card class="box-card">
          <p class="number">30</p>
          <p class="text">投诉未处理产品数</p>
        </el-card>
        <el-card class="box-card">
          <p class="number">30</p>
          <p class="text">评论未读产品数</p>
        </el-card>
      </div>
    </el-card>
  </div>
</template>

<script>
import { Card } from 'element-ui'

export default {
  components: {
    [Card.name]: Card
  }
}
</script>

<style>
.line {
  display: flex;
  justify-content: left;
  align-content: center;
}

.box-card {
  padding: 0 10px;
  margin: 10px;
}

.number {
  text-align: center;
  font-size: 20px;
  font-weight: 600;
  color: rgb(255, 153, 51);
  margin: 20px;
}

.text {
  text-align: center;
  font-size: 20px;
}
</style>
