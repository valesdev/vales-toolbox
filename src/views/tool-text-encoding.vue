
<template>

	<div>
		<div class="row">
			<p class="col-md-4">
				<label>Input</label>
				<textarea rows="5" class="form-control" v-model="input" placeholder="Input"></textarea>
			</p>
			<p class="col-md-4">
				<label>URL Encoded</label>
				<textarea rows="5" class="form-control" v-model="output_urlencode" placeholder="Output" disabled="disabled"></textarea>
			</p>
			<p class="col-md-4">
				<label>ASCII</label>
				<textarea rows="5" class="form-control" v-model="output_ascii" placeholder="Output" disabled="disabled"></textarea>
			</p>
			<p class="col-md-4">
				<label>Unicode HTML</label>
				<textarea rows="5" class="form-control" v-model="output_unicode" placeholder="Output" disabled="disabled"></textarea>
			</p>
			<p class="col-md-4">
				<label>UTF-8 HTML</label>
				<textarea rows="5" class="form-control" v-model="output_utf8" placeholder="Output" disabled="disabled"></textarea>
			</p>
		</div>
	</div>

</template>

<script>
	export default {
		'data': function () {
			return {
				'input': '',
			}
		},
		'computed': {
			'output_urlencode': function () {
				return encodeURIComponent(this.input)
			},
			'output_ascii': function () {
				var chars = this.input.split('')
				var output = ''
				for(var i = 0; i < chars.length; i ++) {
					var code = Number(chars[i].charCodeAt(0))
					var charAscii = code.toString(16)
					charAscii = new String('0000').substring(charAscii.length, 4) + charAscii
					output += '\\u' + charAscii
				}
				return output
			},
			'output_unicode': function () {
				var output = ''
				for (var i = 0; i < this.input.length; i ++) {
					output += '&#' + this.input.charCodeAt(i) + ';'
				}
				return output
			},
			'output_utf8': function () {
				return this.input.replace(/[^\u0000-\u00FF]/g, function ($0) {
					return escape($0).replace(/(%u)(\w{4})/gi, '&#x$2;')
				})
			},
		},
	}
</script>

