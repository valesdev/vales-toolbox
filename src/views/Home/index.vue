<template>
  <main>
    <div class="row">

      <div class="col-sm-6 col-md-4 mb-4">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">文本编码</h5>
            <p class="card-text">Text encoder</p>
            <router-link :to="{ name: 'ToolTextEncode' }" class="btn btn-primary">开始使用</router-link>
          </div>
        </div>
      </div>

      <div class="col-sm-6 col-md-4 mb-4">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">Base64 编码和解码</h5>
            <p class="card-text">Base64 encode and decode</p>
            <router-link :to="{ name: 'ToolBase64' }" class="btn btn-primary">开始使用</router-link>
          </div>
        </div>
      </div>

      <div class="col-sm-6 col-md-4 mb-4">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">二维码生成</h5>
            <p class="card-text">QR Code generator</p>
            <router-link :to="{ name: 'ToolQrcode' }" class="btn btn-primary">开始使用</router-link>
          </div>
        </div>
      </div>

      <div class="col-sm-6 col-md-4 mb-4">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">贷款计算</h5>
            <p class="card-text">Loan calculator</p>
            <router-link :to="{ name: 'ToolLoan' }" class="btn btn-primary">开始使用</router-link>
          </div>
        </div>
      </div>

      <div class="col-sm-6 col-md-4 mb-4">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">博联信号转换</h5>
            <p class="card-text">Broadlink signals converter</p>
            <router-link :to="{ name: 'ToolBroadlink' }" class="btn btn-primary">开始使用</router-link>
          </div>
        </div>
      </div>

    </div>
  </main>
</template>
