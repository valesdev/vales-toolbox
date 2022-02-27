<template>
  <main>
    <h2>贷款计算</h2>
    <hr />

    <div class="row">
      <div class="col-md-4">
        <div class="mb-3">
          <label class="form-label">贷款总额</label>
          <div class="input-group">
            <input type="number" class="form-control" v-model="loan" placeholder="单位：元" min="1" max="10000000000" step="1" />
            <span class="input-group-text">元</span>
          </div>
        </div>
      </div>
      <div class="col-6 col-md-4">
        <div class="mb-3">
          <label class="form-label">期数</label>
          <div class="input-group">
            <input type="number" class="form-control" v-model="period" placeholder="单位：月" min="1" max="360" step="1" />
            <span class="input-group-text">月</span>
          </div>
        </div>
      </div>
      <div class="col-6 col-md-4">
        <div class="mb-3">
          <template v-if="method !== 'fq'">
            <label class="form-label">年利率</label>
            <div class="input-group">
              <input type="number" class="form-control" v-model="rateYear" placeholder="单位：%" min="0.001" max="100" step="0.001" />
              <span class="input-group-text">％</span>
            </div>
          </template>
          <template v-else>
            <label class="form-label">月手续费</label>
            <div class="input-group">
              <input type="number" class="form-control" v-model="rateMonth" placeholder="单位：%" min="0.001" max="100" step="0.001" />
              <span class="input-group-text">％</span>
            </div>
          </template>
        </div>
      </div>
    </div>

    <div class="mb-3">
      <label class="form-label">还款方式</label>
      <div>
        <div class="form-check form-check-inline">
          <label class="form-check-label">
            <input type="radio" class="form-check-input" v-model="method" value="debx" /> 等额本息
          </label>
        </div>
        <div class="form-check form-check-inline">
          <label class="form-check-label">
            <input type="radio" class="form-check-input" v-model="method" value="debj" /> 等额本金
          </label>
        </div>
        <div class="form-check form-check-inline">
          <label class="form-check-label">
            <input type="radio" class="form-check-input" v-model="method" value="xxhb" /> 先息后本
          </label>
        </div>
        <div class="form-check form-check-inline">
          <label class="form-check-label">
            <input type="radio" class="form-check-input" v-model="method" value="fq" /> 分期
          </label>
        </div>
      </div>
    </div>

    <div class="mb-3">
      <label class="form-label">还款总计</label>
      <ul>
        <li>
          <label>还款总额</label>：<span class="font-monospace">{{ filterCurrency(result['capTotal']) }}</span>
        </li>
        <li>
          <label>本金总额</label>：<span class="font-monospace">{{ filterCurrency(result['corpusTotal']) }}</span>
        </li>
        <li>
          <label>利息总额</label>：<span class="font-monospace">{{ filterCurrency(result['varerestTotal']) }}</span>
        </li>
      </ul>
    </div>

    <div class="mb-3">
      <label class="form-label">还款明细</label>
      <div class="table-responsive" style="font-size: 75%;">
        <table class="table table-bordered table-hover table-sm">
          <thead>
            <tr>
              <th class="text-center">#</th>
              <th class="text-end">月供</th>
              <th class="text-end">月供本金</th>
              <th class="text-end">月供利息</th>
              <th class="text-end">本金余额</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="num in period" :key="num">
              <th class="text-center">{{ num }}</th>
              <td class="text-end font-monospace">{{ filterCurrency(result[num][0]) }}</td>
              <td class="text-end font-monospace">{{ filterCurrency(result[num][1]) }}</td>
              <td class="text-end font-monospace">{{ filterCurrency(result[num][2]) }}</td>
              <td class="text-end font-monospace">{{ filterCurrency(result[num][3]) }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </main>
</template>

<script>
import numbro from 'numbro'

export default {
  data () {
    return {
      loan: 1000000,
      period: 240,
      rateYear: 4.9,
      rateMonth: 4.9 / 12,
      method: 'debx'
    }
  },
  computed: {
    result () {
      const output = {}
      let corpusLeftMon = this.loan // 等额还款之剩余本金
      let capMon = 0
      let corpusMon = 0
      let varerestMon = 0
      let capTotal = 0
      let corpusTotal = 0
      let varerestTotal = 0
      switch (this.method) {
        case 'debx':
          for (let i = 1; i <= this.period; i++) {
            capMon = (this.loan * (this.rateYear / 12 / 100) * Math.pow((this.rateYear / 12 / 100) + 1, this.period)) / (Math.pow((this.rateYear / 12 / 100) + 1, this.period) - 1) // 月供
            varerestMon = corpusLeftMon * (this.rateYear / 12 / 100) // 月供利息
            corpusMon = capMon - varerestMon // 月供本金
            corpusLeftMon -= corpusMon // 本金余额
            capTotal += capMon // 还款总额
            corpusTotal += corpusMon // 本金总额
            varerestTotal += varerestMon // 利息总额
            output[i] = [capMon, corpusMon, varerestMon, corpusLeftMon]
          }
          break
        case 'debj':
          corpusMon = this.loan / this.period // 月供本金
          for (let i = 1; i <= this.period; i++) {
            varerestMon = corpusLeftMon * (this.rateYear / 12 / 100) // 月供利息
            capMon = corpusMon + varerestMon // 月供
            corpusLeftMon -= corpusMon // 本金余额
            capTotal += capMon // 还款总额
            corpusTotal += corpusMon // 本金总额
            varerestTotal += varerestMon // 利息总额
            output[i] = [capMon, corpusMon, varerestMon, corpusLeftMon]
          }
          break
        case 'xxhb':
          for (let i = 1; i <= this.period; i++) {
            corpusMon = 0 // 月供本金
            if (this.period === i) {
              corpusMon = corpusLeftMon
            }
            varerestMon = corpusLeftMon * (this.rateYear / 12 / 100) // 月供利息
            capMon = corpusMon + varerestMon // 月供
            corpusLeftMon -= corpusMon // 本金余额
            capTotal += capMon // 还款总额
            corpusTotal += corpusMon // 本金总额
            varerestTotal += varerestMon // 利息总额
            output[i] = [capMon, corpusMon, varerestMon, corpusLeftMon]
          }
          break
        case 'fq':
          for (let i = 1; i <= this.period; i++) {
            corpusMon = this.loan / this.period // 月供本金
            varerestMon = this.loan * (this.rateMonth / 100) // 月供利息
            capMon = corpusMon + varerestMon // 月供
            corpusLeftMon -= corpusMon // 本金余额
            capTotal += capMon // 还款总额
            corpusTotal += corpusMon // 本金总额
            varerestTotal += varerestMon // 利息总额
            output[i] = [capMon, corpusMon, varerestMon, corpusLeftMon]
          }
          break
      }
      output.capTotal = capTotal
      output.corpusTotal = corpusTotal
      output.varerestTotal = varerestTotal
      return output
    }
  },
  watch: {
    rateYear (val) {
      if (this.method === 'fq') {
        this.rateMonth = val / 12
      }
    },
    rateMonth (val) {
      if (this.method === 'fq') {
        this.rateYear = val * 12
      }
    }
  },
  methods: {
    filterCurrency (value) {
      return numbro(value).format('0,0.00')
    }
  }
}
</script>
