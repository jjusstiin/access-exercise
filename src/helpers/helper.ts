/**
 * 通用文字 input 正規表示 中文、數字、半形特殊符號、全形
 *
 * - 半形英文、數字、空格 : [A-Za-z0-9 ]
 * - 中文 [\\u4e00-\\u9fa5]
 * - 半形特殊符號 : [~`!@#$%^&*()\-_+={[}\]|\\:;"'<,>.?\\/]
 * - 全形特殊符號 : [～｀！＠＃＄％＾＆＊（）－＿＋＝｛［｝］｜：；＂＇＜，＞．？／。、]
 */
export const commonStringRegex =
  /^[A-Za-z0-9 \u4E00-\u9FA5~`!@#$%^&*()\-_+={[}\]|\\:;"'<,>.?\\/～｀！＠＃＄％＾＆＊（）－＿＋＝｛［｝］｜：；＂＇＜，＞．？／。、]*$/;
