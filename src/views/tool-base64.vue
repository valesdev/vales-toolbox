
<template>

	<div>
		<div class="row">
			<div class="col-md-5">
				<p>
					<label>Input Type</label>
					<br />
					<label class="radio-inline">
						<input type="radio" v-model="input_type" value="text"> Text
					</label>
					<label class="radio-inline">
						<input type="radio" v-model="input_type" value="file"> File
					</label>
				</p>
				<p v-if="'text' == input_type">
					<label>Input Text</label>
					<textarea rows="5" class="form-control" v-model="input_text" placeholder="Input"></textarea>
				</p>
				<p v-if="'file' == input_type">
					<label>Input File</label>
					<input type="file" v-on:change="select_input_file" />
				</p>
			</div>
			<div class="col-md-2">
				<p>
					<a href="javascript:void(0);" class="btn btn-block btn-default" v-on:click.prevent="encode">Encode</a>
				</p>
				<p>
					<a href="javascript:void(0);" class="btn btn-block btn-default" v-on:click.prevent="decode">Decode</a>
				</p>
			</div>
			<div class="col-md-5">
				<p>
					<label>Output Type</label>
					<br />
					<label class="radio-inline">
						<input type="radio" v-model="output_type" value="text"> Text
					</label>
					<label class="radio-inline">
						<input type="radio" v-model="output_type" value="file"> File
					</label>
				</p>
				<p v-if="'text' == output_type">
					<label>Output Text</label>
					<textarea rows="5" class="form-control" v-model="output_text" placeholder="Output"></textarea>
				</p>
			</div>
		</div>
	</div>

</template>

<script>
	var Base64    = require('base64-js')
	var FileSaver = require('file-saver')
	export default {
		'data': function () {
			return {
				'input_type': 'text',
				'input_text': '',
				'input_file_byte_arr': '',
				'output_type': 'text',
				'output_text': '',
			}
		},
		'computed': {
		},
		'methods': {
			'select_input_file': function (e) {
				var _this = this
				var reader = new FileReader()
				reader.onload = function(){
					_this.input_file_byte_arr = new Uint8Array(this.result)
				}
				reader.readAsArrayBuffer(e.target.files[0])
			},
			'encode': function () {
				var toUTF8Array = function (str) {
					var arr = []
					for (var i = 0; i < str.length; i ++) {
						var charcode = str.charCodeAt(i)
						if (charcode < 0x80) arr.push(charcode)
						else if (charcode < 0x800) {
							arr.push(0xc0 | (charcode >> 6), 
							         0x80 | (charcode & 0x3f))
						}
						else if (charcode < 0xd800 || charcode >= 0xe000) {
							arr.push(0xe0 | (charcode >> 12), 
							         0x80 | ((charcode>>6) & 0x3f), 
							         0x80 | (charcode & 0x3f))
						} else { // surrogate pair
							i ++
							// UTF-16 encodes 0x10000-0x10FFFF by
							// subtracting 0x10000 and splitting the
							// 20 bits of 0x0-0xFFFFF into two halves
							charcode = 0x10000 + (((charcode & 0x3ff)<<10) | (str.charCodeAt(i) & 0x3ff))
							arr.push(0xf0 | (charcode >>18), 
							         0x80 | ((charcode>>12) & 0x3f), 
							         0x80 | ((charcode>>6) & 0x3f), 
							         0x80 | (charcode & 0x3f))
						}
					}
					return arr
				}
				var output = ''
				switch (this.input_type) {
					case 'text':
						output = Base64.fromByteArray(toUTF8Array(this.input_text))
						break
					case 'file':
						output = Base64.fromByteArray(this.input_file_byte_arr)
						break
				}
				this.output(output)
			},
			'decode': function () {
				var output = ''
				switch (this.input_type) {
					case 'text':
						output = Base64.toByteArray(this.input_text)
						break
					case 'file':
						output = Base64.toByteArray(new Buffer(this.input_file_byte_arr).toString('utf-8'))
						break
				}
				this.output(output)
			},
			'output': function (data) {
				switch (this.output_type) {
					case 'text':
						if ('object' === typeof data) {
							data = new Buffer(data).toString('utf-8')
						}
						this.output_text = data
						break
					case 'file':
						var blob = new Blob([data], {
							'type': 'application/octet-stream',
						})
						FileSaver.saveAs(blob, 'data')
						break
				}
			}
		},
	}
</script>

