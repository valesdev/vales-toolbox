<template>
  <main>
    <div class="row">

      <div class="col-sm-6 col-md-4 mb-4">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">数据处理</h5>
            <p class="card-text">Data Processing</p>
            <RouterLink :to="{ name: 'ToolDataProcessing' }" class="btn btn-primary">开始使用</RouterLink>
          </div>
        </div>
      </div>

      <div class="col-sm-6 col-md-4 mb-4">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">二维码生成</h5>
            <p class="card-text">QR Code generator</p>
            <RouterLink :to="{ name: 'ToolQrcode' }" class="btn btn-primary">开始使用</RouterLink>
          </div>
        </div>
      </div>

      <div class="col-sm-6 col-md-4 mb-4">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">字符映射表</h5>
            <p class="card-text">Character Map</p>
            <RouterLink :to="{ name: 'ToolCharmap' }" class="btn btn-primary">开始使用</RouterLink>
          </div>
        </div>
      </div>

      <div class="col-sm-6 col-md-4 mb-4">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">贷款计算</h5>
            <p class="card-text">Loan calculator</p>
            <RouterLink :to="{ name: 'ToolLoan' }" class="btn btn-primary">开始使用</RouterLink>
          </div>
        </div>
      </div>

      <div class="col-sm-6 col-md-4 mb-4">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">博联信号转换</h5>
            <p class="card-text">Broadlink signals converter</p>
            <RouterLink :to="{ name: 'ToolBroadlink' }" class="btn btn-primary">开始使用</RouterLink>
          </div>
        </div>
      </div>

    </div>
  </main>
</template>
