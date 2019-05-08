
<template>

	<div>
		<div class="form-group">
			<label class="control-label">贷款总额</label>
			<div class="input-group">
				<input type="number" class="form-control" v-model="loan" placeholder="单位：元" min="1" max="10000000000" step="1" />
				<span class="input-group-addon">元</span>
			</div>
		</div>
		<div class="row">
			<div class="form-group col-xs-6">
				<label class="control-label">期数</label>
				<div class="input-group">
					<input type="number" class="form-control" v-model="period" placeholder="单位：月" min="1" max="360" step="1" />
					<span class="input-group-addon">月</span>
				</div>
			</div>
			<div class="form-group col-xs-6" v-if="'fq' !== method">
				<label class="control-label">年利率</label>
				<div class="input-group">
					<input type="number" class="form-control" v-model="rate_year" placeholder="单位：%" min="0.001" max="100" step="0.001" />
					<span class="input-group-addon">%</span>
				</div>
			</div>
			<div class="form-group col-xs-6" v-if="'fq' === method">
				<label class="control-label">月手续费</label>
				<div class="input-group">
					<input type="number" class="form-control" v-model="rate_month" placeholder="单位：%" min="0.001" max="100" step="0.001" />
					<span class="input-group-addon">%</span>
				</div>
			</div>
		</div>
		<div class="form-group">
			<label class="control-label">还款方式</label>
			<p>
				<label class="radio-inline">
					<input type="radio" v-model="method" value="debx" /> 等额本息
				</label>
				<label class="radio-inline">
					<input type="radio" v-model="method" value="debj" /> 等额本金
				</label>
				<label class="radio-inline">
					<input type="radio" v-model="method" value="xxhb" /> 先息后本
				</label>
				<label class="radio-inline">
					<input type="radio" v-model="method" value="fq" /> 分期
				</label>
			</p>
		</div>
		<div class="form-group" v-if="table">
			<label class="control-label">计算结果</label>
			<p>
				还款总额：<strong>{{ table['capTotal'] | currency }}</strong>；利息总额：<strong>{{ table['varerestTotal'] | currency }}</strong>
			</p>
			<table class="table table-bordered table-condensed">
				<thead>
					<tr>
						<th class="text-center">#</th>
						<th class="text-center">月供</th>
						<th class="text-center">月供本金</th>
						<th class="text-center">月供利息</th>
						<th class="text-center">本金余额</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="num in period">
						<th class="text-center">{{ num }}</th>
						<td class="text-right">{{ table[num][0] | currency }}</td>
						<td class="text-right">{{ table[num][1] | currency }}</td>
						<td class="text-right">{{ table[num][2] | currency }}</td>
						<td class="text-right">{{ table[num][3] | currency }}</td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>

</template>

<script>
	import Numbro from 'numbro'
	export default {
		'data': function () {
			return {
				'loan': 1000000,
				'period': 240,
				'rate_year': 4.9,
				'rate_month': 4.9/12,
				'method': 'debx',
			}
		},
		'computed': {
			'table': function () {
				var output = {}
				var corpusLeftMon = this.loan, // 等额还款之剩余本金
					capMon            = 0,
					corpusMon         = 0,
					varerestMon       = 0,
					capTotal          = 0,
					corpusTotal       = 0,
					varerestTotal     = 0
				switch (this.method) {
					case 'debx':
						for (var i = 1; i <= this.period; i ++) {
							capMon = (this.loan * (this.rate_year/12/100) * Math.pow((this.rate_year/12/100) + 1, this.period)) / (Math.pow((this.rate_year/12/100) + 1, this.period) - 1) // 月供
							varerestMon = corpusLeftMon * (this.rate_year/12/100) // 月供利息
							corpusMon = capMon - varerestMon // 月供本金
							corpusLeftMon -= corpusMon // 本金余额
							capTotal += capMon // 还款总额
							corpusTotal += corpusMon // 本金总额
							varerestTotal += varerestMon // 利息总额
							output[i] = [capMon, corpusMon, varerestMon, corpusLeftMon]
						}
						break;
					case 'debj':
						corpusMon = this.loan / this.period // 月供本金
						for (var i = 1; i <= this.period; i ++) {
							varerestMon = corpusLeftMon * (this.rate_year/12/100) // 月供利息
							capMon = corpusMon + varerestMon // 月供
							corpusLeftMon -= corpusMon // 本金余额
							capTotal += capMon // 还款总额
							corpusTotal += corpusMon // 本金总额
							varerestTotal += varerestMon // 利息总额
							output[i] = [capMon, corpusMon, varerestMon, corpusLeftMon]
						}
						break
					case 'xxhb':
						for (var i = 1; i <= this.period; i ++) {
							corpusMon = 0 // 月供本金
							if (this.period === i) {
								corpusMon = corpusLeftMon
							}
							varerestMon = corpusLeftMon * (this.rate_year/12/100) // 月供利息
							capMon = corpusMon + varerestMon // 月供
							corpusLeftMon -= corpusMon // 本金余额
							capTotal += capMon // 还款总额
							corpusTotal += corpusMon // 本金总额
							varerestTotal += varerestMon // 利息总额
							output[i] = [capMon, corpusMon, varerestMon, corpusLeftMon]
						}
						break
					case 'fq':
						for (var i = 1; i <= this.period; i ++) {
							corpusMon = this.loan / this.period // 月供本金
							varerestMon = this.loan * (this.rate_month/100) // 月供利息
							capMon = corpusMon + varerestMon // 月供
							corpusLeftMon -= corpusMon // 本金余额
							capTotal += capMon // 还款总额
							corpusTotal += corpusMon // 本金总额
							varerestTotal += varerestMon // 利息总额
							output[i] = [capMon, corpusMon, varerestMon, corpusLeftMon]
						}
						break
				}
				output['capTotal']      = capTotal
				output['corpusTotal']   = corpusTotal
				output['varerestTotal'] = varerestTotal
				return output
			},
		},
		'watch': {
			'rate_year': function (val) {
				if ('fq' !== this.method) {
					this.rate_month = val / 12
				}
			},
			'rate_month': function (val) {
				if ('fq' === this.method) {
					this.rate_year = val * 12
				}
			},
		},
		'filters': {
			'currency': function (value) {
				return Numbro(value).format('0.00')
			},
		},
	}
</script>

