# sf-i18n-cli

## 介绍

根据公司的项目框架和结构，开发出一个支持批量进行国际化替换的命令行工具。由于工程采用 `vue` 框架，涉及 `script` 标签和 `template` 标签的替换，因此没有采用将 `vue` 文件解析成 `ast` 处理之后重新还原成 `vue sfc`。

此项目工具全部都是采用正则匹配，提取出中文信息，因此对于某些特定写法，正则提取可能不能提取完整。

## 安装

```
npm i sf-i18n-cli -g
```

## 使用

在项目根目录下执行下面命令

```
sf
```

## 指令参数

| 参数              | 类型    | 默认值                 | 描述                                                                                   |
| --------------- | ------- | ---------------------- | -------------------------------------------------------------------------- |
| i, init            | String  | ''                        | 初始化相关配置文件。                                                              |
| r, read          | String  | ''                        | 提取指定模块下的中文。                                                            |
| w, write        | String  | ''                        | 将中文文本替换成 i18n 格式。                                                     |

## 配置参数

```js
module.exports = {
  // 项目的根目录
  root: '/Users/tauysi/Documents/Govern',
  // 项目入口
  entry: 'modules',
  // 项目名称
  project: 'ETL',
  // 具体模块
  modules: 'accessManage',
  // 格式化样式
  prettier: {},
  // 全局语言包路径
  globalLang: ['assets', 'lang', 'zh_CN.json'],
  // 是否加载全局语言包
  loadGlobalLang: true,
  // 是否跳过翻译（此配置未完成）
  skipTranslate: true,
  // 翻译成具体的语言
  locales: ['en-US'],
};
```

## 具体步骤

1. 将 sf-i18n-cli 安装在全局

```
npm i sf-i18n-cli -g
```

2. 进入项目根目录，执行初始化配置的命令

```
sf init
```

3. 修改 `sf-i18n.config.js` 配置文件
4. 执行提取中文命令

```
sf read
```

5. 执行转换命令

```
sf write
```

## 转换效果

转换前
```vue
<template>
    <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="活动名称">
            <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="活动区域">
            <el-select v-model="form.region" placeholder="请选择活动区域">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="活动时间">
            <el-col :span="11">
                <el-date-picker type="date" placeholder="选择日期" v-model="form.date1"
                    style="width: 100%;"></el-date-picker>
            </el-col>
            <el-col class="line" :span="2">-</el-col>
            <el-col :span="11">
                <el-time-picker placeholder="选择时间" v-model="form.date2" style="width: 100%;"></el-time-picker>
            </el-col>
        </el-form-item>
        <el-form-item label="即时配送">
            <el-switch v-model="form.delivery"></el-switch>
        </el-form-item>
        <el-form-item label="活动性质">
            <el-checkbox-group v-model="form.type">
                <el-checkbox label="餐厅线上活动" name="type"></el-checkbox>
                <el-checkbox label="地推活动" name="type"></el-checkbox>
                <el-checkbox label="线下主题活动" name="type"></el-checkbox>
                <el-checkbox label="单纯品牌曝光" name="type"></el-checkbox>
            </el-checkbox-group>
        </el-form-item>
        <el-form-item label="特殊资源">
            <el-radio-group v-model="form.resource">
                <el-radio label="线上品牌商赞助"></el-radio>
                <el-radio label="线下场地免费"></el-radio>
            </el-radio-group>
        </el-form-item>
        <el-form-item label="活动形式">
            <el-input type="textarea" v-model="form.desc"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="onSubmit">立即创建</el-button>
            <el-button>取消</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
export default {
    name: '',
    data() {
        return {
            form: {
                name: '',
                region: '',
                date1: '',
                date2: '',
                delivery: false,
                type: [],
                resource: '',
                desc: ''
            },
            name: '小王'
        }
    },
};
</script>
```
转换后
```vue
<template>
    <el-form ref="form" :model="form" label-width="80px">
        <el-form-item :label="$t('accessManage.5eda80b12e5da', '活动名称')">
            <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item :label="$t('accessManage.f1ee87baefa34', '活动区域')">
            <el-select v-model="form.region" :placeholder="$t('accessManage.8ab4944b0189c', '请选择活动区域')">
                <el-option :label="$t('accessManage.68e776277ab0b', '区域一')" value="shanghai"></el-option>
                <el-option :label="$t('accessManage.815676c60bcb3', '区域二')" value="beijing"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item :label="$t('accessManage.5a94c1664b6af', '活动时间')">
            <el-col :span="11">
                <el-date-picker type="date" :placeholder="$t('accessManage.645fc77f3a3a5', '选择日期')" v-model="form.date1"
                    style="width: 100%;"></el-date-picker>
            </el-col>
            <el-col class="line" :span="2">-</el-col>
            <el-col :span="11">
                <el-time-picker :placeholder="$t('accessManage.6d3c50a7ee938', '选择时间')" v-model="form.date2"
                    style="width: 100%;"></el-time-picker>
            </el-col>
        </el-form-item>
        <el-form-item :label="$t('accessManage.852fd1189884d', '即时配送')">
            <el-switch v-model="form.delivery"></el-switch>
        </el-form-item>
        <el-form-item :label="$t('accessManage.1efbe1edd028f', '活动性质')">
            <el-checkbox-group v-model="form.type">
                <el-checkbox :label="$t('accessManage.1818d10799583', '餐厅线上活动')" name="type"></el-checkbox>
                <el-checkbox :label="$t('accessManage.5003f6adc18a6', '地推活动')" name="type"></el-checkbox>
                <el-checkbox :label="$t('accessManage.17b678bf5af61', '线下主题活动')" name="type"></el-checkbox>
                <el-checkbox :label="$t('accessManage.80daaf8ede048', '单纯品牌曝光')" name="type"></el-checkbox>
            </el-checkbox-group>
        </el-form-item>
        <el-form-item :label="$t('accessManage.640099e6d80a8', '特殊资源')">
            <el-radio-group v-model="form.resource">
                <el-radio :label="$t('accessManage.710c172baca66', '线上品牌商赞助')"></el-radio>
                <el-radio :label="$t('accessManage.99ea8519cc029', '线下场地免费')"></el-radio>
            </el-radio-group>
        </el-form-item>
        <el-form-item :label="$t('accessManage.5b70fd672c36', '活动形式')">
            <el-input type="textarea" v-model="form.desc"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="onSubmit"> {{ $t('accessManage.8afe003146aff', '立即创建') }} </el-button>
            <el-button>取消</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
export default {
    name: '',
    data() {
        return {
            form: {
                name: '',
                region: '',
                date1: '',
                date2: '',
                delivery: false,
                type: [],
                resource: '',
                desc: ''
            },
            name: this.$t('accessManage.63209fa442edb', '小王')
        }
    },
};
</script>
```

## 注意事项

- 转换完之后需要检查是否有特殊情况未被正则匹配到的结果。

## 开源许可证

MIT
