/*
 * @Author: Souma
 * @LastEditTime: 2021-11-08 03:01:51
 */
let keigenn = {
  "4a7": { dodge: 1, physics: 1, magic: 1, darkness: 1, condition: "player" }, //铁壁
  "740": { dodge: 1, physics: 1, magic: 1, darkness: 1, condition: "player" }, //盾阵
  "496": { dodge: 1, physics: 1, magic: 1, darkness: 1, condition: "player" }, //干预
  "4a": { dodge: 1, physics: 1, magic: 1, darkness: 1, condition: "player" }, //预警
  "498": { dodge: 1, physics: 1, magic: 1, darkness: 1, condition: "player" }, //武装
  "52": { dodge: 1, physics: 1, magic: 1, darkness: 1, condition: "player" }, //神圣领域
  "2df": { dodge: 1, physics: 1, magic: 1, darkness: 1, condition: "player" }, //原初的直觉
  "8b3": { dodge: 1, physics: 1, magic: 1, darkness: 1, condition: "player" }, //原初的勇猛
  "57": { dodge: 1, physics: 1, magic: 1, darkness: 1, condition: "player" }, //战栗
  // "59": { dodge: 1, physics: 1, magic: 1, darkness: 1,condition: "player"  }, //复仇
  "199": { dodge: 1, physics: 1, magic: 1, darkness: 1, condition: "player" }, //死斗
  "49a": { dodge: 1, physics: 1, magic: 1, darkness: 1, condition: "player" }, //至黑之夜
  "2ea": { dodge: 1, physics: 0, magic: 1, darkness: 0, condition: "player" }, //弃明投暗
  "2eb": { dodge: 1, physics: 1, magic: 1, darkness: 1, condition: "player" }, //暗影墙
  "766": { dodge: 1, physics: 0, magic: 1, darkness: 0, condition: "player" }, //暗黑布道
  "32a": { dodge: 1, physics: 1, magic: 1, darkness: 1, condition: "player" }, //行尸走肉
  "811": { dodge: 1, physics: 1, magic: 1, darkness: 1, condition: "player" }, //死而不僵
  "730": { dodge: 1, physics: 1, magic: 1, darkness: 1, condition: "player" }, //石之心
  "728": { dodge: 1, physics: 1, magic: 1, darkness: 1, condition: "player" }, //伪装
  "72a": { dodge: 1, physics: 1, magic: 1, darkness: 1, condition: "player" }, //星云
  "72f": { dodge: 1, physics: 0, magic: 1, darkness: 0, condition: "player" }, //光之心
  "72c": { dodge: 1, physics: 1, magic: 1, darkness: 1, condition: "player" }, //超火流星
  "751": { dodge: 1, physics: 1, magic: 1, darkness: 1, condition: "player" }, //节制
  "12b": { dodge: 1, physics: 1, magic: 1, darkness: 1, condition: "player" }, //野战治疗阵
  "13d": { dodge: 1, physics: 0, magic: 1, darkness: 0, condition: "player" }, //异想的幻光
  "753": { dodge: 1, physics: 0, magic: 1, darkness: 0, condition: "player" }, //炽天的幻光
  "351": { dodge: 1, physics: 1, magic: 1, darkness: 1, condition: "player" }, //命运之轮（日）
  "4b6": { dodge: 1, physics: 1, magic: 1, darkness: 1, condition: "player" }, //命运之轮（夜）

  "4d0": { dodge: 1, physics: 1, magic: 1, darkness: 1, condition: "player" }, //心眼
  "49b": { dodge: 1, physics: 1, magic: 1, darkness: 1, condition: "player" }, //金刚极意
  "78e": { dodge: 1, physics: 1, magic: 1, darkness: 1, condition: "player" }, //行吟
  "79f": { dodge: 1, physics: 1, magic: 1, darkness: 1, condition: "player" }, //策动
  "722": { dodge: 1, physics: 1, magic: 1, darkness: 1, condition: "player" }, //防守之桑巴

  "2d7": { dodge: 1, physics: 1, magic: 1, darkness: 1, condition: "player" }, //圣光幕帘（已触发）
  "4c2": { dodge: 1, physics: 1, magic: 1, darkness: 1, condition: "player" }, //神祝祷
  "5b1": { dodge: 1, physics: 1, magic: 1, darkness: 1, condition: "player" }, //摆脱
  "129": { dodge: 1, physics: 1, magic: 1, darkness: 1, condition: "player" }, //鼓舞
  "77d": { dodge: 1, physics: 1, magic: 1, darkness: 1, condition: "player" }, //炽天的幕帘
  "345": { dodge: 1, physics: 1, magic: 1, darkness: 1, condition: "player" }, //黑夜领域
  "758": { dodge: 1, physics: 1, magic: 1, darkness: 1, condition: "player" }, //天星冲日（夜）
  "761": { dodge: 1, physics: 1, magic: 1, darkness: 1, condition: "player" }, //天星交错（夜）
  "1e8": { dodge: 1, physics: 1, magic: 1, darkness: 1, condition: "player" }, //残影
  "a8": { dodge: 1, physics: 1, magic: 1, darkness: 1, condition: "player" }, //魔罩
  "790": { dodge: 1, physics: 1, magic: 1, darkness: 1, condition: "player" }, //防护障壁
  "76a": { dodge: 1, physics: 1, magic: 1, darkness: 1, condition: "player" }, //残暴弹

  // "4b9": { dodge: 1, physics: 1, magic: 0, darkness: 0, condition: "player" }, //亲疏自行
  "09": { dodge: 1, physics: 1, magic: 0, darkness: 0, condition: "enemy" }, //减速（亲疏自行）
  "4a9": { dodge: 1, physics: 1, magic: 1, darkness: 1, condition: "enemy" }, //雪仇
  "4ab": { dodge: 1, physics: 1, magic: 0, darkness: 0, condition: "enemy" }, //牵制
  "4b3": { dodge: 1, physics: 0, magic: 1, darkness: 0, condition: "enemy" }, //昏乱

  //青魔
  "848": { dodge: 1, physics: 1, magic: 1, darkness: 1, condition: "player" }, //体力增加（捕食）
  "6b3": { dodge: 1, physics: 1, magic: 1, darkness: 1, condition: "enemy" }, //腐臭（臭气）
  "843": { dodge: 1, physics: 0, magic: 1, darkness: 0, condition: "enemy" }, //智力精神降低（魔法锤）
  "9c4": { dodge: 1, physics: 1, magic: 1, darkness: 1, condition: "player" }, //龙之力
  "6ba": { dodge: 1, physics: 1, magic: 1, darkness: 1, condition: "player" }, //超硬化
  "9c0": { dodge: 1, physics: 1, magic: 1, darkness: 1, condition: "player" }, //玄结界
  "847": { dodge: 1, physics: 1, magic: 1, darkness: 1, condition: "player" }, //仙人盾
  "6b7": { dodge: 1, physics: 1, magic: 1, darkness: 1, condition: "player" }, //强力守护
  "842": { dodge: 1, physics: 1, magic: 1, darkness: 1, condition: "player" }, //哥布防御

  //受伤减轻
  "37": { dodge: 1, physics: 1, magic: 0, darkness: 0, condition: "player" }, //物理受伤减轻
  "3b": { dodge: 1, physics: 0, magic: 1, darkness: 0, condition: "player" }, //魔法受伤减轻
  "3f": { dodge: 1, physics: 1, magic: 1, darkness: 1, condition: "player" }, //受伤减轻
  "14b": { dodge: 1, physics: 0, magic: 1, darkness: 0, condition: "player" }, //魔法受伤减轻
  "15e": { dodge: 1, physics: 1, magic: 1, darkness: 1, condition: "player" }, //受伤减轻
  "196": { dodge: 1, physics: 1, magic: 1, darkness: 1, condition: "player" }, //受伤减轻
  "246": { dodge: 1, physics: 0, magic: 1, darkness: 0, condition: "player" }, //魔法受伤减轻
  "247": { dodge: 1, physics: 1, magic: 0, darkness: 0, condition: "player" }, //物理受伤减轻
  "258": { dodge: 1, physics: 0, magic: 1, darkness: 0, condition: "player" }, //魔法受伤减轻
  "259": { dodge: 1, physics: 1, magic: 0, darkness: 0, condition: "player" }, //物理受伤减轻
  "324": { dodge: 1, physics: 1, magic: 1, darkness: 1, condition: "player" }, //受伤减轻
  "32c": { dodge: 1, physics: 0, magic: 1, darkness: 0, condition: "player" }, //魔法受伤减轻
  "383": { dodge: 1, physics: 1, magic: 0, darkness: 0, condition: "player" }, //物理受伤减轻
  "390": { dodge: 1, physics: 1, magic: 1, darkness: 1, condition: "player" }, //受伤减轻
  "3a1": { dodge: 1, physics: 1, magic: 1, darkness: 1, condition: "player" }, //受伤减轻
  "44c": { dodge: 1, physics: 1, magic: 1, darkness: 1, condition: "player" }, //受伤减轻
  "4ca": { dodge: 1, physics: 1, magic: 1, darkness: 1, condition: "player" }, //受伤减轻
  "609": { dodge: 1, physics: 1, magic: 1, darkness: 1, condition: "player" }, //受伤减轻
  "6df": { dodge: 1, physics: 1, magic: 1, darkness: 1, condition: "player" }, //受伤减轻
  "6f6": { dodge: 1, physics: 1, magic: 1, darkness: 1, condition: "player" }, //受伤减轻
  "896": { dodge: 1, physics: 1, magic: 1, darkness: 1, condition: "player" }, //受伤减轻
  "9ca": { dodge: 1, physics: 1, magic: 1, darkness: 1, condition: "player" }, //受伤减轻

  //受伤加重
  "38": { dodge: 1, physics: 1, magic: 0, darkness: 0, condition: "player" }, //物理受伤加重
  "3c": { dodge: 1, physics: 0, magic: 1, darkness: 0, condition: "player" }, //魔法受伤加重
  "40": { dodge: 1, physics: 1, magic: 1, darkness: 1, condition: "player" }, //受伤加重
  "7e": { dodge: 1, physics: 1, magic: 0, darkness: 0, condition: "player" }, //物理受伤加重
  "c8": { dodge: 1, physics: 1, magic: 0, darkness: 0, condition: "player" }, //物理受伤加重
  "ca": { dodge: 1, physics: 1, magic: 1, darkness: 1, condition: "player" }, //受伤加重
  "1bc": { dodge: 1, physics: 1, magic: 1, darkness: 1, condition: "player" }, //受伤加重
  "1ed": { dodge: 1, physics: 1, magic: 0, darkness: 0, condition: "player" }, //物理受伤加重
  "1ee": { dodge: 1, physics: 0, magic: 1, darkness: 0, condition: "player" }, //魔法受伤加重
  "233": { dodge: 1, physics: 1, magic: 1, darkness: 1, condition: "player" }, //受伤加重
  "27e": { dodge: 1, physics: 1, magic: 1, darkness: 1, condition: "player" }, //受伤加重
  "291": { dodge: 1, physics: 1, magic: 0, darkness: 0, condition: "player" }, //物理受伤加重
  "292": { dodge: 1, physics: 0, magic: 1, darkness: 0, condition: "player" }, //魔法受伤加重
  "2b7": { dodge: 1, physics: 1, magic: 0, darkness: 0, condition: "player" }, //物理受伤加重
  "2ca": { dodge: 1, physics: 1, magic: 1, darkness: 1, condition: "player" }, //受伤加重
  "326": { dodge: 1, physics: 1, magic: 1, darkness: 1, condition: "player" }, //受伤加重
  "37d": { dodge: 1, physics: 1, magic: 1, darkness: 1, condition: "player" }, //受伤加重
  "3a6": { dodge: 1, physics: 1, magic: 0, darkness: 0, condition: "player" }, //物理受伤加重
  "41e": { dodge: 1, physics: 1, magic: 1, darkness: 1, condition: "player" }, //受伤加重
  "472": { dodge: 1, physics: 0, magic: 1, darkness: 0, condition: "player" }, //魔法受伤加重
  "4b8": { dodge: 1, physics: 1, magic: 1, darkness: 1, condition: "player" }, //受伤加重
  "57a": { dodge: 1, physics: 1, magic: 1, darkness: 1, condition: "player" }, //受伤加重
  "584": { dodge: 1, physics: 1, magic: 1, darkness: 1, condition: "player" }, //受伤加重
  "63d": { dodge: 1, physics: 1, magic: 1, darkness: 1, condition: "player" }, //受伤加重
  "6fd": { dodge: 1, physics: 1, magic: 1, darkness: 1, condition: "player" }, //受伤加重
  "735": { dodge: 1, physics: 1, magic: 1, darkness: 1, condition: "player" }, //受伤加重
  "82a": { dodge: 1, physics: 1, magic: 0, darkness: 0, condition: "player" }, //物理受伤加重
  "82b": { dodge: 1, physics: 0, magic: 1, darkness: 0, condition: "player" }, //魔法受伤加重
  "84b": { dodge: 1, physics: 1, magic: 0, darkness: 0, condition: "player" }, //物理受伤加重
  "8a5": { dodge: 1, physics: 1, magic: 1, darkness: 1, condition: "player" }, //受伤加重
  "92b": { dodge: 1, physics: 1, magic: 1, darkness: 1, condition: "player" }, //受伤加重

  //耐性降低
  "1af": { dodge: 1, physics: 1, magic: 1, darkness: 1, condition: "player" }, //水属性耐性降低
  "23c": { dodge: 1, physics: 1, magic: 1, darkness: 1, condition: "player" }, //斩击耐性降低
  "23d": { dodge: 1, physics: 1, magic: 1, darkness: 1, condition: "player" }, //打击耐性降低
  "240": { dodge: 1, physics: 1, magic: 1, darkness: 1, condition: "player" }, //雷属性耐性降低
  "242": { dodge: 1, physics: 1, magic: 1, darkness: 1, condition: "player" }, //主首耐性降低
  "24c": { dodge: 1, physics: 1, magic: 1, darkness: 1, condition: "player" }, //天启耐性降低
  "26d": { dodge: 1, physics: 1, magic: 1, darkness: 1, condition: "player" }, //火属性耐性降低
  "29e": { dodge: 1, physics: 1, magic: 1, darkness: 1, condition: "player" }, //火属性耐性降低
  "2ad": { dodge: 1, physics: 1, magic: 1, darkness: 1, condition: "player" }, //风属性耐性降低
  "333": { dodge: 1, physics: 1, magic: 1, darkness: 1, condition: "player" }, //斩击耐性降低
  "334": { dodge: 1, physics: 1, magic: 1, darkness: 1, condition: "player" }, //突刺耐性降低
  "335": { dodge: 1, physics: 1, magic: 1, darkness: 1, condition: "player" }, //打击耐性降低
  "3a3": { dodge: 1, physics: 1, magic: 1, darkness: 1, condition: "player" }, //打击耐性降低
  "401": { dodge: 1, physics: 1, magic: 1, darkness: 1, condition: "player" }, //水属性耐性大幅降低
  "402": { dodge: 1, physics: 1, magic: 1, darkness: 1, condition: "player" }, //雷属性耐性大幅降低
  "41c": { dodge: 1, physics: 1, magic: 1, darkness: 1, condition: "player" }, //风属性耐性大幅降低
  "41d": { dodge: 1, physics: 1, magic: 1, darkness: 1, condition: "player" }, //土属性耐性大幅降低
  "471": { dodge: 1, physics: 1, magic: 1, darkness: 1, condition: "player" }, //火属性耐性大幅降低
  "485": { dodge: 1, physics: 1, magic: 1, darkness: 1, condition: "player" }, //水属性耐性大幅降低
  "4e7": { dodge: 1, physics: 1, magic: 1, darkness: 1, condition: "player" }, //火属性耐性大幅降低
  "4ec": { dodge: 1, physics: 1, magic: 1, darkness: 1, condition: "player" }, //雷属性耐性大幅降低
  "4f8": { dodge: 1, physics: 1, magic: 1, darkness: 1, condition: "player" }, //斩击耐性大幅降低
  "59b": { dodge: 1, physics: 1, magic: 1, darkness: 1, condition: "player" }, //突刺耐性大幅降低
  "615": { dodge: 1, physics: 1, magic: 1, darkness: 1, condition: "player" }, //最大体力大幅降低
  "69d": { dodge: 1, physics: 1, magic: 1, darkness: 1, condition: "player" }, //斩击耐性降低
  "69e": { dodge: 1, physics: 1, magic: 1, darkness: 1, condition: "player" }, //突刺耐性降低
  "6a6": { dodge: 1, physics: 1, magic: 1, darkness: 1, condition: "player" }, //冰属性耐性降低
  "6f0": { dodge: 1, physics: 1, magic: 1, darkness: 1, condition: "player" }, //打击耐性降低
  "7b5": { dodge: 1, physics: 1, magic: 1, darkness: 1, condition: "player" }, //雷属性耐性大幅降低
  "82e": { dodge: 1, physics: 1, magic: 1, darkness: 1, condition: "player" }, //水属性耐性大幅降低
  "82f": { dodge: 1, physics: 1, magic: 1, darkness: 1, condition: "player" }, //雷属性耐性大幅降低
  "830": { dodge: 1, physics: 1, magic: 1, darkness: 1, condition: "player" }, //风属性耐性大幅降低
  "831": { dodge: 1, physics: 1, magic: 1, darkness: 1, condition: "player" }, //土属性耐性大幅降低
  "832": { dodge: 1, physics: 1, magic: 1, darkness: 1, condition: "player" }, //火属性耐性大幅降低
  "849": { dodge: 1, physics: 1, magic: 1, darkness: 1, condition: "player" }, //星极性耐性降低
  "84a": { dodge: 1, physics: 1, magic: 1, darkness: 1, condition: "player" }, //灵极性耐性降低
  "860": { dodge: 1, physics: 1, magic: 1, darkness: 1, condition: "player" }, //水属性耐性大幅降低
  "861": { dodge: 1, physics: 1, magic: 1, darkness: 1, condition: "player" }, //雷属性耐性大幅降低
  "8c8": { dodge: 1, physics: 1, magic: 1, darkness: 1, condition: "player" }, //打击耐性降低
  "8e6": { dodge: 1, physics: 1, magic: 1, darkness: 1, condition: "player" }, //光属性耐性降低
  "943": { dodge: 1, physics: 1, magic: 1, darkness: 1, condition: "player" }, //雷属性耐性降低
  "9a1": { dodge: 1, physics: 1, magic: 1, darkness: 1, condition: "player" }, //冰属性耐性大幅降低
  "9cc": { dodge: 1, physics: 1, magic: 1, darkness: 1, condition: "player" }, //斩击耐性降低
};
export { keigenn };
