window.consultCatalog = {
  "meta": {
    "generatedBy": "tools/xhs_gemini_consult_lab/scripts/build_consults.py",
    "scenarioCount": 30,
    "note": "Gemini-powered consult pages with structured intake."
  },
  "scenarios": [
    {
      "slug": "relationship-01",
      "title": "这段关系还值得继续吗",
      "subtitle": "把拉扯、期待和真实代价拆开看。",
      "category": "关系咨询",
      "collection": "亲密关系入口",
      "consultFocus": "从互动模式、边界感和情绪代价判断关系方向",
      "formIntro": "先用几个固定选项把关系阶段和主要卡点说清楚，再补一段你最近的真实情况。",
      "responseIntro": "这里更像一次结构化关系咨询，不会替你拍板，但会帮你把局面看清楚。",
      "followupPlaceholder": "继续追问，例如：如果我决定后退一步，第一句该怎么说？",
      "followupSuggestions": [
        "如果我不想继续拉扯，第一句我该怎么说？",
        "我最需要观察对方接下来哪三个信号？"
      ],
      "quickPrompts": [
        "他不是完全不理我，但总在我想撤的时候又靠近。",
        "我知道自己很累，但又舍不得直接切断。",
        "我怕不是舍不得他，而是舍不得自己投入过。"
      ],
      "palette": {
        "accent": "#ff6d84",
        "accentSoft": "rgba(255, 109, 132, 0.16)",
        "accentStrong": "#d93258",
        "glow": "rgba(255, 109, 132, 0.28)"
      },
      "fields": [
        {
          "id": "stage",
          "label": "关系阶段",
          "type": "select",
          "options": [
            {
              "value": "just-met",
              "label": "刚认识/有点好感"
            },
            {
              "value": "ambiguous",
              "label": "暧昧拉扯中"
            },
            {
              "value": "dating",
              "label": "稳定交往中"
            },
            {
              "value": "cooling",
              "label": "明显变冷/在疏远"
            },
            {
              "value": "break-edge",
              "label": "处在要不要结束的边缘"
            }
          ]
        },
        {
          "id": "other_pattern",
          "label": "对方最近更像哪种模式",
          "type": "select",
          "options": [
            {
              "value": "stable",
              "label": "主动稳定，会回应也愿意沟通"
            },
            {
              "value": "hot-cold",
              "label": "忽冷忽热，让人抓不准"
            },
            {
              "value": "avoid",
              "label": "回避沟通，一提重点就躲"
            },
            {
              "value": "need-based",
              "label": "只在自己需要时靠近"
            },
            {
              "value": "unclear",
              "label": "看不清，信息一直不够明确"
            }
          ]
        },
        {
          "id": "your_state",
          "label": "你现在更接近哪种感受",
          "type": "select",
          "options": [
            {
              "value": "hopeful",
              "label": "还有期待，想再努力一下"
            },
            {
              "value": "uneasy",
              "label": "不安委屈，心里总悬着"
            },
            {
              "value": "tired",
              "label": "已经很累，像在硬撑"
            },
            {
              "value": "angry",
              "label": "有点气，感觉自己被消耗"
            },
            {
              "value": "numb",
              "label": "开始麻木，不太想再解释"
            }
          ]
        },
        {
          "id": "main_question",
          "label": "这次你最卡的决定",
          "type": "select",
          "options": [
            {
              "value": "continue",
              "label": "要不要继续投入"
            },
            {
              "value": "confess",
              "label": "要不要主动表达/表白"
            },
            {
              "value": "boundary",
              "label": "要不要立边界"
            },
            {
              "value": "break",
              "label": "要不要分开/退场"
            },
            {
              "value": "talk",
              "label": "不知道该怎么把话说出口"
            }
          ]
        },
        {
          "id": "story",
          "label": "最近发生了什么",
          "type": "textarea",
          "placeholder": "把最近最让你纠结的一段互动写出来，越具体越好。"
        },
        {
          "id": "desired_outcome",
          "label": "你理想里最希望走向什么结果",
          "type": "textarea",
          "placeholder": "比如：想要明确、想停损、想看看还有没有修复空间。"
        }
      ]
    },
    {
      "slug": "relationship-02",
      "title": "我到底要不要表白",
      "subtitle": "适合卡在主动表达还是继续观察的人。",
      "category": "关系咨询",
      "collection": "亲密关系入口",
      "consultFocus": "从互动模式、边界感和情绪代价判断关系方向",
      "formIntro": "先用几个固定选项把关系阶段和主要卡点说清楚，再补一段你最近的真实情况。",
      "responseIntro": "这里更像一次结构化关系咨询，不会替你拍板，但会帮你把局面看清楚。",
      "followupPlaceholder": "继续追问，例如：如果我决定后退一步，第一句该怎么说？",
      "followupSuggestions": [
        "如果我不想继续拉扯，第一句我该怎么说？",
        "我最需要观察对方接下来哪三个信号？"
      ],
      "quickPrompts": [
        "他不是完全不理我，但总在我想撤的时候又靠近。",
        "我知道自己很累，但又舍不得直接切断。",
        "我怕不是舍不得他，而是舍不得自己投入过。"
      ],
      "palette": {
        "accent": "#ff6d84",
        "accentSoft": "rgba(255, 109, 132, 0.16)",
        "accentStrong": "#d93258",
        "glow": "rgba(255, 109, 132, 0.28)"
      },
      "fields": [
        {
          "id": "stage",
          "label": "关系阶段",
          "type": "select",
          "options": [
            {
              "value": "just-met",
              "label": "刚认识/有点好感"
            },
            {
              "value": "ambiguous",
              "label": "暧昧拉扯中"
            },
            {
              "value": "dating",
              "label": "稳定交往中"
            },
            {
              "value": "cooling",
              "label": "明显变冷/在疏远"
            },
            {
              "value": "break-edge",
              "label": "处在要不要结束的边缘"
            }
          ]
        },
        {
          "id": "other_pattern",
          "label": "对方最近更像哪种模式",
          "type": "select",
          "options": [
            {
              "value": "stable",
              "label": "主动稳定，会回应也愿意沟通"
            },
            {
              "value": "hot-cold",
              "label": "忽冷忽热，让人抓不准"
            },
            {
              "value": "avoid",
              "label": "回避沟通，一提重点就躲"
            },
            {
              "value": "need-based",
              "label": "只在自己需要时靠近"
            },
            {
              "value": "unclear",
              "label": "看不清，信息一直不够明确"
            }
          ]
        },
        {
          "id": "your_state",
          "label": "你现在更接近哪种感受",
          "type": "select",
          "options": [
            {
              "value": "hopeful",
              "label": "还有期待，想再努力一下"
            },
            {
              "value": "uneasy",
              "label": "不安委屈，心里总悬着"
            },
            {
              "value": "tired",
              "label": "已经很累，像在硬撑"
            },
            {
              "value": "angry",
              "label": "有点气，感觉自己被消耗"
            },
            {
              "value": "numb",
              "label": "开始麻木，不太想再解释"
            }
          ]
        },
        {
          "id": "main_question",
          "label": "这次你最卡的决定",
          "type": "select",
          "options": [
            {
              "value": "continue",
              "label": "要不要继续投入"
            },
            {
              "value": "confess",
              "label": "要不要主动表达/表白"
            },
            {
              "value": "boundary",
              "label": "要不要立边界"
            },
            {
              "value": "break",
              "label": "要不要分开/退场"
            },
            {
              "value": "talk",
              "label": "不知道该怎么把话说出口"
            }
          ]
        },
        {
          "id": "story",
          "label": "最近发生了什么",
          "type": "textarea",
          "placeholder": "把最近最让你纠结的一段互动写出来，越具体越好。"
        },
        {
          "id": "desired_outcome",
          "label": "你理想里最希望走向什么结果",
          "type": "textarea",
          "placeholder": "比如：想要明确、想停损、想看看还有没有修复空间。"
        }
      ]
    },
    {
      "slug": "relationship-03",
      "title": "我该不该分手",
      "subtitle": "帮你判断现在是情绪上头，还是关系真的走到尽头。",
      "category": "关系咨询",
      "collection": "亲密关系入口",
      "consultFocus": "从互动模式、边界感和情绪代价判断关系方向",
      "formIntro": "先用几个固定选项把关系阶段和主要卡点说清楚，再补一段你最近的真实情况。",
      "responseIntro": "这里更像一次结构化关系咨询，不会替你拍板，但会帮你把局面看清楚。",
      "followupPlaceholder": "继续追问，例如：如果我决定后退一步，第一句该怎么说？",
      "followupSuggestions": [
        "如果我不想继续拉扯，第一句我该怎么说？",
        "我最需要观察对方接下来哪三个信号？"
      ],
      "quickPrompts": [
        "他不是完全不理我，但总在我想撤的时候又靠近。",
        "我知道自己很累，但又舍不得直接切断。",
        "我怕不是舍不得他，而是舍不得自己投入过。"
      ],
      "palette": {
        "accent": "#ff6d84",
        "accentSoft": "rgba(255, 109, 132, 0.16)",
        "accentStrong": "#d93258",
        "glow": "rgba(255, 109, 132, 0.28)"
      },
      "fields": [
        {
          "id": "stage",
          "label": "关系阶段",
          "type": "select",
          "options": [
            {
              "value": "just-met",
              "label": "刚认识/有点好感"
            },
            {
              "value": "ambiguous",
              "label": "暧昧拉扯中"
            },
            {
              "value": "dating",
              "label": "稳定交往中"
            },
            {
              "value": "cooling",
              "label": "明显变冷/在疏远"
            },
            {
              "value": "break-edge",
              "label": "处在要不要结束的边缘"
            }
          ]
        },
        {
          "id": "other_pattern",
          "label": "对方最近更像哪种模式",
          "type": "select",
          "options": [
            {
              "value": "stable",
              "label": "主动稳定，会回应也愿意沟通"
            },
            {
              "value": "hot-cold",
              "label": "忽冷忽热，让人抓不准"
            },
            {
              "value": "avoid",
              "label": "回避沟通，一提重点就躲"
            },
            {
              "value": "need-based",
              "label": "只在自己需要时靠近"
            },
            {
              "value": "unclear",
              "label": "看不清，信息一直不够明确"
            }
          ]
        },
        {
          "id": "your_state",
          "label": "你现在更接近哪种感受",
          "type": "select",
          "options": [
            {
              "value": "hopeful",
              "label": "还有期待，想再努力一下"
            },
            {
              "value": "uneasy",
              "label": "不安委屈，心里总悬着"
            },
            {
              "value": "tired",
              "label": "已经很累，像在硬撑"
            },
            {
              "value": "angry",
              "label": "有点气，感觉自己被消耗"
            },
            {
              "value": "numb",
              "label": "开始麻木，不太想再解释"
            }
          ]
        },
        {
          "id": "main_question",
          "label": "这次你最卡的决定",
          "type": "select",
          "options": [
            {
              "value": "continue",
              "label": "要不要继续投入"
            },
            {
              "value": "confess",
              "label": "要不要主动表达/表白"
            },
            {
              "value": "boundary",
              "label": "要不要立边界"
            },
            {
              "value": "break",
              "label": "要不要分开/退场"
            },
            {
              "value": "talk",
              "label": "不知道该怎么把话说出口"
            }
          ]
        },
        {
          "id": "story",
          "label": "最近发生了什么",
          "type": "textarea",
          "placeholder": "把最近最让你纠结的一段互动写出来，越具体越好。"
        },
        {
          "id": "desired_outcome",
          "label": "你理想里最希望走向什么结果",
          "type": "textarea",
          "placeholder": "比如：想要明确、想停损、想看看还有没有修复空间。"
        }
      ]
    },
    {
      "slug": "relationship-04",
      "title": "这段关系里边界怎么立",
      "subtitle": "更适合总在配合、退让、解释的人。",
      "category": "关系咨询",
      "collection": "亲密关系入口",
      "consultFocus": "从互动模式、边界感和情绪代价判断关系方向",
      "formIntro": "先用几个固定选项把关系阶段和主要卡点说清楚，再补一段你最近的真实情况。",
      "responseIntro": "这里更像一次结构化关系咨询，不会替你拍板，但会帮你把局面看清楚。",
      "followupPlaceholder": "继续追问，例如：如果我决定后退一步，第一句该怎么说？",
      "followupSuggestions": [
        "如果我不想继续拉扯，第一句我该怎么说？",
        "我最需要观察对方接下来哪三个信号？"
      ],
      "quickPrompts": [
        "他不是完全不理我，但总在我想撤的时候又靠近。",
        "我知道自己很累，但又舍不得直接切断。",
        "我怕不是舍不得他，而是舍不得自己投入过。"
      ],
      "palette": {
        "accent": "#ff6d84",
        "accentSoft": "rgba(255, 109, 132, 0.16)",
        "accentStrong": "#d93258",
        "glow": "rgba(255, 109, 132, 0.28)"
      },
      "fields": [
        {
          "id": "stage",
          "label": "关系阶段",
          "type": "select",
          "options": [
            {
              "value": "just-met",
              "label": "刚认识/有点好感"
            },
            {
              "value": "ambiguous",
              "label": "暧昧拉扯中"
            },
            {
              "value": "dating",
              "label": "稳定交往中"
            },
            {
              "value": "cooling",
              "label": "明显变冷/在疏远"
            },
            {
              "value": "break-edge",
              "label": "处在要不要结束的边缘"
            }
          ]
        },
        {
          "id": "other_pattern",
          "label": "对方最近更像哪种模式",
          "type": "select",
          "options": [
            {
              "value": "stable",
              "label": "主动稳定，会回应也愿意沟通"
            },
            {
              "value": "hot-cold",
              "label": "忽冷忽热，让人抓不准"
            },
            {
              "value": "avoid",
              "label": "回避沟通，一提重点就躲"
            },
            {
              "value": "need-based",
              "label": "只在自己需要时靠近"
            },
            {
              "value": "unclear",
              "label": "看不清，信息一直不够明确"
            }
          ]
        },
        {
          "id": "your_state",
          "label": "你现在更接近哪种感受",
          "type": "select",
          "options": [
            {
              "value": "hopeful",
              "label": "还有期待，想再努力一下"
            },
            {
              "value": "uneasy",
              "label": "不安委屈，心里总悬着"
            },
            {
              "value": "tired",
              "label": "已经很累，像在硬撑"
            },
            {
              "value": "angry",
              "label": "有点气，感觉自己被消耗"
            },
            {
              "value": "numb",
              "label": "开始麻木，不太想再解释"
            }
          ]
        },
        {
          "id": "main_question",
          "label": "这次你最卡的决定",
          "type": "select",
          "options": [
            {
              "value": "continue",
              "label": "要不要继续投入"
            },
            {
              "value": "confess",
              "label": "要不要主动表达/表白"
            },
            {
              "value": "boundary",
              "label": "要不要立边界"
            },
            {
              "value": "break",
              "label": "要不要分开/退场"
            },
            {
              "value": "talk",
              "label": "不知道该怎么把话说出口"
            }
          ]
        },
        {
          "id": "story",
          "label": "最近发生了什么",
          "type": "textarea",
          "placeholder": "把最近最让你纠结的一段互动写出来，越具体越好。"
        },
        {
          "id": "desired_outcome",
          "label": "你理想里最希望走向什么结果",
          "type": "textarea",
          "placeholder": "比如：想要明确、想停损、想看看还有没有修复空间。"
        }
      ]
    },
    {
      "slug": "relationship-05",
      "title": "冷战到底怎么破",
      "subtitle": "适合卡在不知该开口、还是该后退一步的人。",
      "category": "关系咨询",
      "collection": "亲密关系入口",
      "consultFocus": "从互动模式、边界感和情绪代价判断关系方向",
      "formIntro": "先用几个固定选项把关系阶段和主要卡点说清楚，再补一段你最近的真实情况。",
      "responseIntro": "这里更像一次结构化关系咨询，不会替你拍板，但会帮你把局面看清楚。",
      "followupPlaceholder": "继续追问，例如：如果我决定后退一步，第一句该怎么说？",
      "followupSuggestions": [
        "如果我不想继续拉扯，第一句我该怎么说？",
        "我最需要观察对方接下来哪三个信号？"
      ],
      "quickPrompts": [
        "他不是完全不理我，但总在我想撤的时候又靠近。",
        "我知道自己很累，但又舍不得直接切断。",
        "我怕不是舍不得他，而是舍不得自己投入过。"
      ],
      "palette": {
        "accent": "#ff6d84",
        "accentSoft": "rgba(255, 109, 132, 0.16)",
        "accentStrong": "#d93258",
        "glow": "rgba(255, 109, 132, 0.28)"
      },
      "fields": [
        {
          "id": "stage",
          "label": "关系阶段",
          "type": "select",
          "options": [
            {
              "value": "just-met",
              "label": "刚认识/有点好感"
            },
            {
              "value": "ambiguous",
              "label": "暧昧拉扯中"
            },
            {
              "value": "dating",
              "label": "稳定交往中"
            },
            {
              "value": "cooling",
              "label": "明显变冷/在疏远"
            },
            {
              "value": "break-edge",
              "label": "处在要不要结束的边缘"
            }
          ]
        },
        {
          "id": "other_pattern",
          "label": "对方最近更像哪种模式",
          "type": "select",
          "options": [
            {
              "value": "stable",
              "label": "主动稳定，会回应也愿意沟通"
            },
            {
              "value": "hot-cold",
              "label": "忽冷忽热，让人抓不准"
            },
            {
              "value": "avoid",
              "label": "回避沟通，一提重点就躲"
            },
            {
              "value": "need-based",
              "label": "只在自己需要时靠近"
            },
            {
              "value": "unclear",
              "label": "看不清，信息一直不够明确"
            }
          ]
        },
        {
          "id": "your_state",
          "label": "你现在更接近哪种感受",
          "type": "select",
          "options": [
            {
              "value": "hopeful",
              "label": "还有期待，想再努力一下"
            },
            {
              "value": "uneasy",
              "label": "不安委屈，心里总悬着"
            },
            {
              "value": "tired",
              "label": "已经很累，像在硬撑"
            },
            {
              "value": "angry",
              "label": "有点气，感觉自己被消耗"
            },
            {
              "value": "numb",
              "label": "开始麻木，不太想再解释"
            }
          ]
        },
        {
          "id": "main_question",
          "label": "这次你最卡的决定",
          "type": "select",
          "options": [
            {
              "value": "continue",
              "label": "要不要继续投入"
            },
            {
              "value": "confess",
              "label": "要不要主动表达/表白"
            },
            {
              "value": "boundary",
              "label": "要不要立边界"
            },
            {
              "value": "break",
              "label": "要不要分开/退场"
            },
            {
              "value": "talk",
              "label": "不知道该怎么把话说出口"
            }
          ]
        },
        {
          "id": "story",
          "label": "最近发生了什么",
          "type": "textarea",
          "placeholder": "把最近最让你纠结的一段互动写出来，越具体越好。"
        },
        {
          "id": "desired_outcome",
          "label": "你理想里最希望走向什么结果",
          "type": "textarea",
          "placeholder": "比如：想要明确、想停损、想看看还有没有修复空间。"
        }
      ]
    },
    {
      "slug": "social-01",
      "title": "这段友谊要不要继续",
      "subtitle": "看看这段关系是磨合期，还是已经在持续消耗你。",
      "category": "社交咨询",
      "collection": "朋友与边界",
      "consultFocus": "从能量消耗、关系边界和回应方式判断社交选择",
      "formIntro": "这类问题最怕空泛，所以先定位你现在卡在哪种社交局面里。",
      "responseIntro": "Gemini 会把你的社交局面拆开看，不只给安慰，也会给你更适合的应对角度。",
      "followupPlaceholder": "继续追问，例如：如果我不想继续维护这段关系，我该怎么收口？",
      "followupSuggestions": [
        "如果我不想继续投入这段友谊，我该怎么慢慢退？",
        "我到底该解释清楚，还是直接减少投入？"
      ],
      "quickPrompts": [
        "每次跟这群人见完面，我都像被抽干一样。",
        "我不知道是我太敏感，还是这段关系真的不对劲。",
        "我总觉得自己在人群里一直在配合别人。"
      ],
      "palette": {
        "accent": "#34b8a5",
        "accentSoft": "rgba(52, 184, 165, 0.16)",
        "accentStrong": "#117e6d",
        "glow": "rgba(52, 184, 165, 0.28)"
      },
      "fields": [
        {
          "id": "scene",
          "label": "你现在主要困在什么社交场景",
          "type": "select",
          "options": [
            {
              "value": "friendship",
              "label": "朋友/闺蜜/搭子关系"
            },
            {
              "value": "group",
              "label": "群体社交/小圈子"
            },
            {
              "value": "message",
              "label": "消息往来/要不要回复"
            },
            {
              "value": "work-social",
              "label": "职场社交/饭局往来"
            },
            {
              "value": "mixed",
              "label": "说不清，是多种场景叠在一起"
            }
          ]
        },
        {
          "id": "energy",
          "label": "这段社交最明显带来的感受",
          "type": "select",
          "options": [
            {
              "value": "drain",
              "label": "很耗电，见完面会疲惫"
            },
            {
              "value": "anxious",
              "label": "会反复猜别人怎么看我"
            },
            {
              "value": "guilty",
              "label": "想退出，但会愧疚"
            },
            {
              "value": "confused",
              "label": "我也说不清到底哪里怪"
            },
            {
              "value": "flat",
              "label": "没那么痛苦，但越来越没劲维护"
            }
          ]
        },
        {
          "id": "others_pattern",
          "label": "对方或这群人更像哪种模式",
          "type": "select",
          "options": [
            {
              "value": "warm",
              "label": "表面热情，但深层支持有限"
            },
            {
              "value": "demand",
              "label": "需要我配合很多、回应很多"
            },
            {
              "value": "unclear",
              "label": "态度模糊，让我很难拿捏"
            },
            {
              "value": "control",
              "label": "边界感弱，容易评判或拿捏"
            },
            {
              "value": "distance",
              "label": "我感觉自己在被慢慢边缘化"
            }
          ]
        },
        {
          "id": "main_need",
          "label": "你现在最想得到什么",
          "type": "select",
          "options": [
            {
              "value": "clarity",
              "label": "搞清楚这段关系值不值得"
            },
            {
              "value": "boundary",
              "label": "学会立边界，不再硬撑"
            },
            {
              "value": "exit",
              "label": "找到更体面的退出方式"
            },
            {
              "value": "reply",
              "label": "决定现在到底该不该回应"
            },
            {
              "value": "circle",
              "label": "弄清楚自己更适合什么圈子"
            }
          ]
        },
        {
          "id": "story",
          "label": "最近最让你卡住的一件事",
          "type": "textarea",
          "placeholder": "把最近的一次互动或长期累积的感受写下来。"
        },
        {
          "id": "wish",
          "label": "如果这件事能变好，你最想改善哪一点",
          "type": "textarea",
          "placeholder": "比如：不再反复猜测、能安心退出、找到更适合的朋友。"
        }
      ]
    },
    {
      "slug": "social-02",
      "title": "为什么社交总让我这么累",
      "subtitle": "帮你分清是场子不对、关系不对，还是边界没立住。",
      "category": "社交咨询",
      "collection": "朋友与边界",
      "consultFocus": "从能量消耗、关系边界和回应方式判断社交选择",
      "formIntro": "这类问题最怕空泛，所以先定位你现在卡在哪种社交局面里。",
      "responseIntro": "Gemini 会把你的社交局面拆开看，不只给安慰，也会给你更适合的应对角度。",
      "followupPlaceholder": "继续追问，例如：如果我不想继续维护这段关系，我该怎么收口？",
      "followupSuggestions": [
        "如果我不想继续投入这段友谊，我该怎么慢慢退？",
        "我到底该解释清楚，还是直接减少投入？"
      ],
      "quickPrompts": [
        "每次跟这群人见完面，我都像被抽干一样。",
        "我不知道是我太敏感，还是这段关系真的不对劲。",
        "我总觉得自己在人群里一直在配合别人。"
      ],
      "palette": {
        "accent": "#34b8a5",
        "accentSoft": "rgba(52, 184, 165, 0.16)",
        "accentStrong": "#117e6d",
        "glow": "rgba(52, 184, 165, 0.28)"
      },
      "fields": [
        {
          "id": "scene",
          "label": "你现在主要困在什么社交场景",
          "type": "select",
          "options": [
            {
              "value": "friendship",
              "label": "朋友/闺蜜/搭子关系"
            },
            {
              "value": "group",
              "label": "群体社交/小圈子"
            },
            {
              "value": "message",
              "label": "消息往来/要不要回复"
            },
            {
              "value": "work-social",
              "label": "职场社交/饭局往来"
            },
            {
              "value": "mixed",
              "label": "说不清，是多种场景叠在一起"
            }
          ]
        },
        {
          "id": "energy",
          "label": "这段社交最明显带来的感受",
          "type": "select",
          "options": [
            {
              "value": "drain",
              "label": "很耗电，见完面会疲惫"
            },
            {
              "value": "anxious",
              "label": "会反复猜别人怎么看我"
            },
            {
              "value": "guilty",
              "label": "想退出，但会愧疚"
            },
            {
              "value": "confused",
              "label": "我也说不清到底哪里怪"
            },
            {
              "value": "flat",
              "label": "没那么痛苦，但越来越没劲维护"
            }
          ]
        },
        {
          "id": "others_pattern",
          "label": "对方或这群人更像哪种模式",
          "type": "select",
          "options": [
            {
              "value": "warm",
              "label": "表面热情，但深层支持有限"
            },
            {
              "value": "demand",
              "label": "需要我配合很多、回应很多"
            },
            {
              "value": "unclear",
              "label": "态度模糊，让我很难拿捏"
            },
            {
              "value": "control",
              "label": "边界感弱，容易评判或拿捏"
            },
            {
              "value": "distance",
              "label": "我感觉自己在被慢慢边缘化"
            }
          ]
        },
        {
          "id": "main_need",
          "label": "你现在最想得到什么",
          "type": "select",
          "options": [
            {
              "value": "clarity",
              "label": "搞清楚这段关系值不值得"
            },
            {
              "value": "boundary",
              "label": "学会立边界，不再硬撑"
            },
            {
              "value": "exit",
              "label": "找到更体面的退出方式"
            },
            {
              "value": "reply",
              "label": "决定现在到底该不该回应"
            },
            {
              "value": "circle",
              "label": "弄清楚自己更适合什么圈子"
            }
          ]
        },
        {
          "id": "story",
          "label": "最近最让你卡住的一件事",
          "type": "textarea",
          "placeholder": "把最近的一次互动或长期累积的感受写下来。"
        },
        {
          "id": "wish",
          "label": "如果这件事能变好，你最想改善哪一点",
          "type": "textarea",
          "placeholder": "比如：不再反复猜测、能安心退出、找到更适合的朋友。"
        }
      ]
    },
    {
      "slug": "social-03",
      "title": "我到底适合什么样的朋友圈",
      "subtitle": "不再盲目融入，先搞清楚你真正舒服的人群配置。",
      "category": "社交咨询",
      "collection": "朋友与边界",
      "consultFocus": "从能量消耗、关系边界和回应方式判断社交选择",
      "formIntro": "这类问题最怕空泛，所以先定位你现在卡在哪种社交局面里。",
      "responseIntro": "Gemini 会把你的社交局面拆开看，不只给安慰，也会给你更适合的应对角度。",
      "followupPlaceholder": "继续追问，例如：如果我不想继续维护这段关系，我该怎么收口？",
      "followupSuggestions": [
        "如果我不想继续投入这段友谊，我该怎么慢慢退？",
        "我到底该解释清楚，还是直接减少投入？"
      ],
      "quickPrompts": [
        "每次跟这群人见完面，我都像被抽干一样。",
        "我不知道是我太敏感，还是这段关系真的不对劲。",
        "我总觉得自己在人群里一直在配合别人。"
      ],
      "palette": {
        "accent": "#34b8a5",
        "accentSoft": "rgba(52, 184, 165, 0.16)",
        "accentStrong": "#117e6d",
        "glow": "rgba(52, 184, 165, 0.28)"
      },
      "fields": [
        {
          "id": "scene",
          "label": "你现在主要困在什么社交场景",
          "type": "select",
          "options": [
            {
              "value": "friendship",
              "label": "朋友/闺蜜/搭子关系"
            },
            {
              "value": "group",
              "label": "群体社交/小圈子"
            },
            {
              "value": "message",
              "label": "消息往来/要不要回复"
            },
            {
              "value": "work-social",
              "label": "职场社交/饭局往来"
            },
            {
              "value": "mixed",
              "label": "说不清，是多种场景叠在一起"
            }
          ]
        },
        {
          "id": "energy",
          "label": "这段社交最明显带来的感受",
          "type": "select",
          "options": [
            {
              "value": "drain",
              "label": "很耗电，见完面会疲惫"
            },
            {
              "value": "anxious",
              "label": "会反复猜别人怎么看我"
            },
            {
              "value": "guilty",
              "label": "想退出，但会愧疚"
            },
            {
              "value": "confused",
              "label": "我也说不清到底哪里怪"
            },
            {
              "value": "flat",
              "label": "没那么痛苦，但越来越没劲维护"
            }
          ]
        },
        {
          "id": "others_pattern",
          "label": "对方或这群人更像哪种模式",
          "type": "select",
          "options": [
            {
              "value": "warm",
              "label": "表面热情，但深层支持有限"
            },
            {
              "value": "demand",
              "label": "需要我配合很多、回应很多"
            },
            {
              "value": "unclear",
              "label": "态度模糊，让我很难拿捏"
            },
            {
              "value": "control",
              "label": "边界感弱，容易评判或拿捏"
            },
            {
              "value": "distance",
              "label": "我感觉自己在被慢慢边缘化"
            }
          ]
        },
        {
          "id": "main_need",
          "label": "你现在最想得到什么",
          "type": "select",
          "options": [
            {
              "value": "clarity",
              "label": "搞清楚这段关系值不值得"
            },
            {
              "value": "boundary",
              "label": "学会立边界，不再硬撑"
            },
            {
              "value": "exit",
              "label": "找到更体面的退出方式"
            },
            {
              "value": "reply",
              "label": "决定现在到底该不该回应"
            },
            {
              "value": "circle",
              "label": "弄清楚自己更适合什么圈子"
            }
          ]
        },
        {
          "id": "story",
          "label": "最近最让你卡住的一件事",
          "type": "textarea",
          "placeholder": "把最近的一次互动或长期累积的感受写下来。"
        },
        {
          "id": "wish",
          "label": "如果这件事能变好，你最想改善哪一点",
          "type": "textarea",
          "placeholder": "比如：不再反复猜测、能安心退出、找到更适合的朋友。"
        }
      ]
    },
    {
      "slug": "social-04",
      "title": "我是不是太在意别人怎么看我",
      "subtitle": "适合反复复盘自己一句话、一个表情的人。",
      "category": "社交咨询",
      "collection": "朋友与边界",
      "consultFocus": "从能量消耗、关系边界和回应方式判断社交选择",
      "formIntro": "这类问题最怕空泛，所以先定位你现在卡在哪种社交局面里。",
      "responseIntro": "Gemini 会把你的社交局面拆开看，不只给安慰，也会给你更适合的应对角度。",
      "followupPlaceholder": "继续追问，例如：如果我不想继续维护这段关系，我该怎么收口？",
      "followupSuggestions": [
        "如果我不想继续投入这段友谊，我该怎么慢慢退？",
        "我到底该解释清楚，还是直接减少投入？"
      ],
      "quickPrompts": [
        "每次跟这群人见完面，我都像被抽干一样。",
        "我不知道是我太敏感，还是这段关系真的不对劲。",
        "我总觉得自己在人群里一直在配合别人。"
      ],
      "palette": {
        "accent": "#34b8a5",
        "accentSoft": "rgba(52, 184, 165, 0.16)",
        "accentStrong": "#117e6d",
        "glow": "rgba(52, 184, 165, 0.28)"
      },
      "fields": [
        {
          "id": "scene",
          "label": "你现在主要困在什么社交场景",
          "type": "select",
          "options": [
            {
              "value": "friendship",
              "label": "朋友/闺蜜/搭子关系"
            },
            {
              "value": "group",
              "label": "群体社交/小圈子"
            },
            {
              "value": "message",
              "label": "消息往来/要不要回复"
            },
            {
              "value": "work-social",
              "label": "职场社交/饭局往来"
            },
            {
              "value": "mixed",
              "label": "说不清，是多种场景叠在一起"
            }
          ]
        },
        {
          "id": "energy",
          "label": "这段社交最明显带来的感受",
          "type": "select",
          "options": [
            {
              "value": "drain",
              "label": "很耗电，见完面会疲惫"
            },
            {
              "value": "anxious",
              "label": "会反复猜别人怎么看我"
            },
            {
              "value": "guilty",
              "label": "想退出，但会愧疚"
            },
            {
              "value": "confused",
              "label": "我也说不清到底哪里怪"
            },
            {
              "value": "flat",
              "label": "没那么痛苦，但越来越没劲维护"
            }
          ]
        },
        {
          "id": "others_pattern",
          "label": "对方或这群人更像哪种模式",
          "type": "select",
          "options": [
            {
              "value": "warm",
              "label": "表面热情，但深层支持有限"
            },
            {
              "value": "demand",
              "label": "需要我配合很多、回应很多"
            },
            {
              "value": "unclear",
              "label": "态度模糊，让我很难拿捏"
            },
            {
              "value": "control",
              "label": "边界感弱，容易评判或拿捏"
            },
            {
              "value": "distance",
              "label": "我感觉自己在被慢慢边缘化"
            }
          ]
        },
        {
          "id": "main_need",
          "label": "你现在最想得到什么",
          "type": "select",
          "options": [
            {
              "value": "clarity",
              "label": "搞清楚这段关系值不值得"
            },
            {
              "value": "boundary",
              "label": "学会立边界，不再硬撑"
            },
            {
              "value": "exit",
              "label": "找到更体面的退出方式"
            },
            {
              "value": "reply",
              "label": "决定现在到底该不该回应"
            },
            {
              "value": "circle",
              "label": "弄清楚自己更适合什么圈子"
            }
          ]
        },
        {
          "id": "story",
          "label": "最近最让你卡住的一件事",
          "type": "textarea",
          "placeholder": "把最近的一次互动或长期累积的感受写下来。"
        },
        {
          "id": "wish",
          "label": "如果这件事能变好，你最想改善哪一点",
          "type": "textarea",
          "placeholder": "比如：不再反复猜测、能安心退出、找到更适合的朋友。"
        }
      ]
    },
    {
      "slug": "social-05",
      "title": "这条消息我到底要不要回",
      "subtitle": "适合卡在回应、拖着、还是干脆不回的人。",
      "category": "社交咨询",
      "collection": "朋友与边界",
      "consultFocus": "从能量消耗、关系边界和回应方式判断社交选择",
      "formIntro": "这类问题最怕空泛，所以先定位你现在卡在哪种社交局面里。",
      "responseIntro": "Gemini 会把你的社交局面拆开看，不只给安慰，也会给你更适合的应对角度。",
      "followupPlaceholder": "继续追问，例如：如果我不想继续维护这段关系，我该怎么收口？",
      "followupSuggestions": [
        "如果我不想继续投入这段友谊，我该怎么慢慢退？",
        "我到底该解释清楚，还是直接减少投入？"
      ],
      "quickPrompts": [
        "每次跟这群人见完面，我都像被抽干一样。",
        "我不知道是我太敏感，还是这段关系真的不对劲。",
        "我总觉得自己在人群里一直在配合别人。"
      ],
      "palette": {
        "accent": "#34b8a5",
        "accentSoft": "rgba(52, 184, 165, 0.16)",
        "accentStrong": "#117e6d",
        "glow": "rgba(52, 184, 165, 0.28)"
      },
      "fields": [
        {
          "id": "scene",
          "label": "你现在主要困在什么社交场景",
          "type": "select",
          "options": [
            {
              "value": "friendship",
              "label": "朋友/闺蜜/搭子关系"
            },
            {
              "value": "group",
              "label": "群体社交/小圈子"
            },
            {
              "value": "message",
              "label": "消息往来/要不要回复"
            },
            {
              "value": "work-social",
              "label": "职场社交/饭局往来"
            },
            {
              "value": "mixed",
              "label": "说不清，是多种场景叠在一起"
            }
          ]
        },
        {
          "id": "energy",
          "label": "这段社交最明显带来的感受",
          "type": "select",
          "options": [
            {
              "value": "drain",
              "label": "很耗电，见完面会疲惫"
            },
            {
              "value": "anxious",
              "label": "会反复猜别人怎么看我"
            },
            {
              "value": "guilty",
              "label": "想退出，但会愧疚"
            },
            {
              "value": "confused",
              "label": "我也说不清到底哪里怪"
            },
            {
              "value": "flat",
              "label": "没那么痛苦，但越来越没劲维护"
            }
          ]
        },
        {
          "id": "others_pattern",
          "label": "对方或这群人更像哪种模式",
          "type": "select",
          "options": [
            {
              "value": "warm",
              "label": "表面热情，但深层支持有限"
            },
            {
              "value": "demand",
              "label": "需要我配合很多、回应很多"
            },
            {
              "value": "unclear",
              "label": "态度模糊，让我很难拿捏"
            },
            {
              "value": "control",
              "label": "边界感弱，容易评判或拿捏"
            },
            {
              "value": "distance",
              "label": "我感觉自己在被慢慢边缘化"
            }
          ]
        },
        {
          "id": "main_need",
          "label": "你现在最想得到什么",
          "type": "select",
          "options": [
            {
              "value": "clarity",
              "label": "搞清楚这段关系值不值得"
            },
            {
              "value": "boundary",
              "label": "学会立边界，不再硬撑"
            },
            {
              "value": "exit",
              "label": "找到更体面的退出方式"
            },
            {
              "value": "reply",
              "label": "决定现在到底该不该回应"
            },
            {
              "value": "circle",
              "label": "弄清楚自己更适合什么圈子"
            }
          ]
        },
        {
          "id": "story",
          "label": "最近最让你卡住的一件事",
          "type": "textarea",
          "placeholder": "把最近的一次互动或长期累积的感受写下来。"
        },
        {
          "id": "wish",
          "label": "如果这件事能变好，你最想改善哪一点",
          "type": "textarea",
          "placeholder": "比如：不再反复猜测、能安心退出、找到更适合的朋友。"
        }
      ]
    },
    {
      "slug": "self-01",
      "title": "我现在到底在焦虑什么",
      "subtitle": "把模糊焦虑拆成更具体、能处理的几部分。",
      "category": "自我状态",
      "collection": "焦虑与内耗",
      "consultFocus": "从压力源、内耗模式和恢复需求判断当下真正卡点",
      "formIntro": "先把你的状态、最常出现的回路和身体信号说出来，回复会更像真的在对症拆解。",
      "responseIntro": "这里不是诊断，而是帮你辨认：你到底在被什么卡住、现在最该先照顾哪一块。",
      "followupPlaceholder": "继续追问，例如：如果我只能先做一件事，应该先动哪一步？",
      "followupSuggestions": [
        "如果我这周只能先做一件事，最值得先做什么？",
        "我怎么判断自己是在逃避，还是确实该停一下？"
      ],
      "quickPrompts": [
        "我明明没发生什么大事，但就是一直很紧。",
        "我知道自己该动，可就是迟迟启动不了。",
        "我最近像在靠意志硬拖着自己往前走。"
      ],
      "palette": {
        "accent": "#7b79ff",
        "accentSoft": "rgba(123, 121, 255, 0.16)",
        "accentStrong": "#4d47d8",
        "glow": "rgba(123, 121, 255, 0.28)"
      },
      "fields": [
        {
          "id": "state",
          "label": "你最近最像哪种状态",
          "type": "select",
          "options": [
            {
              "value": "anxious",
              "label": "焦虑，脑子一直在转"
            },
            {
              "value": "tired",
              "label": "疲惫，像一直在硬撑"
            },
            {
              "value": "stuck",
              "label": "卡住，明知道要动却动不了"
            },
            {
              "value": "numb",
              "label": "麻木，很多事都提不起劲"
            },
            {
              "value": "mixed",
              "label": "混合型，说不上来是哪一种"
            }
          ]
        },
        {
          "id": "loop",
          "label": "你最常陷进去的回路",
          "type": "select",
          "options": [
            {
              "value": "overthink",
              "label": "反复想，但不落地"
            },
            {
              "value": "delay",
              "label": "一拖再拖，越拖越重"
            },
            {
              "value": "self-critic",
              "label": "老觉得自己不够好"
            },
            {
              "value": "escape",
              "label": "总想逃开当下环境"
            },
            {
              "value": "push",
              "label": "明明很累了还继续逼自己"
            }
          ]
        },
        {
          "id": "body_signal",
          "label": "身体最常给你的提醒",
          "type": "select",
          "options": [
            {
              "value": "sleep",
              "label": "睡不好/睡再多也不解乏"
            },
            {
              "value": "chest",
              "label": "胸口闷、心里一直发紧"
            },
            {
              "value": "head",
              "label": "脑子钝、注意力总散"
            },
            {
              "value": "stomach",
              "label": "胃口乱、肠胃容易不舒服"
            },
            {
              "value": "none",
              "label": "说不上明显身体信号，但就是不对劲"
            }
          ]
        },
        {
          "id": "main_need",
          "label": "你现在最想从回复里得到什么",
          "type": "select",
          "options": [
            {
              "value": "clarify",
              "label": "先看清我到底卡在哪"
            },
            {
              "value": "action",
              "label": "想要具体下一步"
            },
            {
              "value": "stop",
              "label": "想判断现在该不该停一下"
            },
            {
              "value": "priority",
              "label": "想知道最该先补哪一块"
            },
            {
              "value": "comfort",
              "label": "想被更清楚地理解一下"
            }
          ]
        },
        {
          "id": "story",
          "label": "把最近最真实的一段状态写下来",
          "type": "textarea",
          "placeholder": "比如最近总在想什么、最难受的时刻是什么、你已经试过什么。"
        },
        {
          "id": "wish",
          "label": "如果一周后能好一点，你希望具体好在哪",
          "type": "textarea",
          "placeholder": "比如：想能睡着、想能启动、想没那么拧巴。"
        }
      ]
    },
    {
      "slug": "self-02",
      "title": "我为什么总是拖延",
      "subtitle": "不只是说执行力，重点看你到底卡在哪个回路。",
      "category": "自我状态",
      "collection": "焦虑与内耗",
      "consultFocus": "从压力源、内耗模式和恢复需求判断当下真正卡点",
      "formIntro": "先把你的状态、最常出现的回路和身体信号说出来，回复会更像真的在对症拆解。",
      "responseIntro": "这里不是诊断，而是帮你辨认：你到底在被什么卡住、现在最该先照顾哪一块。",
      "followupPlaceholder": "继续追问，例如：如果我只能先做一件事，应该先动哪一步？",
      "followupSuggestions": [
        "如果我这周只能先做一件事，最值得先做什么？",
        "我怎么判断自己是在逃避，还是确实该停一下？"
      ],
      "quickPrompts": [
        "我明明没发生什么大事，但就是一直很紧。",
        "我知道自己该动，可就是迟迟启动不了。",
        "我最近像在靠意志硬拖着自己往前走。"
      ],
      "palette": {
        "accent": "#7b79ff",
        "accentSoft": "rgba(123, 121, 255, 0.16)",
        "accentStrong": "#4d47d8",
        "glow": "rgba(123, 121, 255, 0.28)"
      },
      "fields": [
        {
          "id": "state",
          "label": "你最近最像哪种状态",
          "type": "select",
          "options": [
            {
              "value": "anxious",
              "label": "焦虑，脑子一直在转"
            },
            {
              "value": "tired",
              "label": "疲惫，像一直在硬撑"
            },
            {
              "value": "stuck",
              "label": "卡住，明知道要动却动不了"
            },
            {
              "value": "numb",
              "label": "麻木，很多事都提不起劲"
            },
            {
              "value": "mixed",
              "label": "混合型，说不上来是哪一种"
            }
          ]
        },
        {
          "id": "loop",
          "label": "你最常陷进去的回路",
          "type": "select",
          "options": [
            {
              "value": "overthink",
              "label": "反复想，但不落地"
            },
            {
              "value": "delay",
              "label": "一拖再拖，越拖越重"
            },
            {
              "value": "self-critic",
              "label": "老觉得自己不够好"
            },
            {
              "value": "escape",
              "label": "总想逃开当下环境"
            },
            {
              "value": "push",
              "label": "明明很累了还继续逼自己"
            }
          ]
        },
        {
          "id": "body_signal",
          "label": "身体最常给你的提醒",
          "type": "select",
          "options": [
            {
              "value": "sleep",
              "label": "睡不好/睡再多也不解乏"
            },
            {
              "value": "chest",
              "label": "胸口闷、心里一直发紧"
            },
            {
              "value": "head",
              "label": "脑子钝、注意力总散"
            },
            {
              "value": "stomach",
              "label": "胃口乱、肠胃容易不舒服"
            },
            {
              "value": "none",
              "label": "说不上明显身体信号，但就是不对劲"
            }
          ]
        },
        {
          "id": "main_need",
          "label": "你现在最想从回复里得到什么",
          "type": "select",
          "options": [
            {
              "value": "clarify",
              "label": "先看清我到底卡在哪"
            },
            {
              "value": "action",
              "label": "想要具体下一步"
            },
            {
              "value": "stop",
              "label": "想判断现在该不该停一下"
            },
            {
              "value": "priority",
              "label": "想知道最该先补哪一块"
            },
            {
              "value": "comfort",
              "label": "想被更清楚地理解一下"
            }
          ]
        },
        {
          "id": "story",
          "label": "把最近最真实的一段状态写下来",
          "type": "textarea",
          "placeholder": "比如最近总在想什么、最难受的时刻是什么、你已经试过什么。"
        },
        {
          "id": "wish",
          "label": "如果一周后能好一点，你希望具体好在哪",
          "type": "textarea",
          "placeholder": "比如：想能睡着、想能启动、想没那么拧巴。"
        }
      ]
    },
    {
      "slug": "self-03",
      "title": "我该继续扛还是停一下",
      "subtitle": "帮你判断现在是该咬牙，还是该止损和修复。",
      "category": "自我状态",
      "collection": "焦虑与内耗",
      "consultFocus": "从压力源、内耗模式和恢复需求判断当下真正卡点",
      "formIntro": "先把你的状态、最常出现的回路和身体信号说出来，回复会更像真的在对症拆解。",
      "responseIntro": "这里不是诊断，而是帮你辨认：你到底在被什么卡住、现在最该先照顾哪一块。",
      "followupPlaceholder": "继续追问，例如：如果我只能先做一件事，应该先动哪一步？",
      "followupSuggestions": [
        "如果我这周只能先做一件事，最值得先做什么？",
        "我怎么判断自己是在逃避，还是确实该停一下？"
      ],
      "quickPrompts": [
        "我明明没发生什么大事，但就是一直很紧。",
        "我知道自己该动，可就是迟迟启动不了。",
        "我最近像在靠意志硬拖着自己往前走。"
      ],
      "palette": {
        "accent": "#7b79ff",
        "accentSoft": "rgba(123, 121, 255, 0.16)",
        "accentStrong": "#4d47d8",
        "glow": "rgba(123, 121, 255, 0.28)"
      },
      "fields": [
        {
          "id": "state",
          "label": "你最近最像哪种状态",
          "type": "select",
          "options": [
            {
              "value": "anxious",
              "label": "焦虑，脑子一直在转"
            },
            {
              "value": "tired",
              "label": "疲惫，像一直在硬撑"
            },
            {
              "value": "stuck",
              "label": "卡住，明知道要动却动不了"
            },
            {
              "value": "numb",
              "label": "麻木，很多事都提不起劲"
            },
            {
              "value": "mixed",
              "label": "混合型，说不上来是哪一种"
            }
          ]
        },
        {
          "id": "loop",
          "label": "你最常陷进去的回路",
          "type": "select",
          "options": [
            {
              "value": "overthink",
              "label": "反复想，但不落地"
            },
            {
              "value": "delay",
              "label": "一拖再拖，越拖越重"
            },
            {
              "value": "self-critic",
              "label": "老觉得自己不够好"
            },
            {
              "value": "escape",
              "label": "总想逃开当下环境"
            },
            {
              "value": "push",
              "label": "明明很累了还继续逼自己"
            }
          ]
        },
        {
          "id": "body_signal",
          "label": "身体最常给你的提醒",
          "type": "select",
          "options": [
            {
              "value": "sleep",
              "label": "睡不好/睡再多也不解乏"
            },
            {
              "value": "chest",
              "label": "胸口闷、心里一直发紧"
            },
            {
              "value": "head",
              "label": "脑子钝、注意力总散"
            },
            {
              "value": "stomach",
              "label": "胃口乱、肠胃容易不舒服"
            },
            {
              "value": "none",
              "label": "说不上明显身体信号，但就是不对劲"
            }
          ]
        },
        {
          "id": "main_need",
          "label": "你现在最想从回复里得到什么",
          "type": "select",
          "options": [
            {
              "value": "clarify",
              "label": "先看清我到底卡在哪"
            },
            {
              "value": "action",
              "label": "想要具体下一步"
            },
            {
              "value": "stop",
              "label": "想判断现在该不该停一下"
            },
            {
              "value": "priority",
              "label": "想知道最该先补哪一块"
            },
            {
              "value": "comfort",
              "label": "想被更清楚地理解一下"
            }
          ]
        },
        {
          "id": "story",
          "label": "把最近最真实的一段状态写下来",
          "type": "textarea",
          "placeholder": "比如最近总在想什么、最难受的时刻是什么、你已经试过什么。"
        },
        {
          "id": "wish",
          "label": "如果一周后能好一点，你希望具体好在哪",
          "type": "textarea",
          "placeholder": "比如：想能睡着、想能启动、想没那么拧巴。"
        }
      ]
    },
    {
      "slug": "self-04",
      "title": "我现在最缺的是哪一块",
      "subtitle": "看看你真正稀缺的是睡眠、边界、安全感还是动力。",
      "category": "自我状态",
      "collection": "焦虑与内耗",
      "consultFocus": "从压力源、内耗模式和恢复需求判断当下真正卡点",
      "formIntro": "先把你的状态、最常出现的回路和身体信号说出来，回复会更像真的在对症拆解。",
      "responseIntro": "这里不是诊断，而是帮你辨认：你到底在被什么卡住、现在最该先照顾哪一块。",
      "followupPlaceholder": "继续追问，例如：如果我只能先做一件事，应该先动哪一步？",
      "followupSuggestions": [
        "如果我这周只能先做一件事，最值得先做什么？",
        "我怎么判断自己是在逃避，还是确实该停一下？"
      ],
      "quickPrompts": [
        "我明明没发生什么大事，但就是一直很紧。",
        "我知道自己该动，可就是迟迟启动不了。",
        "我最近像在靠意志硬拖着自己往前走。"
      ],
      "palette": {
        "accent": "#7b79ff",
        "accentSoft": "rgba(123, 121, 255, 0.16)",
        "accentStrong": "#4d47d8",
        "glow": "rgba(123, 121, 255, 0.28)"
      },
      "fields": [
        {
          "id": "state",
          "label": "你最近最像哪种状态",
          "type": "select",
          "options": [
            {
              "value": "anxious",
              "label": "焦虑，脑子一直在转"
            },
            {
              "value": "tired",
              "label": "疲惫，像一直在硬撑"
            },
            {
              "value": "stuck",
              "label": "卡住，明知道要动却动不了"
            },
            {
              "value": "numb",
              "label": "麻木，很多事都提不起劲"
            },
            {
              "value": "mixed",
              "label": "混合型，说不上来是哪一种"
            }
          ]
        },
        {
          "id": "loop",
          "label": "你最常陷进去的回路",
          "type": "select",
          "options": [
            {
              "value": "overthink",
              "label": "反复想，但不落地"
            },
            {
              "value": "delay",
              "label": "一拖再拖，越拖越重"
            },
            {
              "value": "self-critic",
              "label": "老觉得自己不够好"
            },
            {
              "value": "escape",
              "label": "总想逃开当下环境"
            },
            {
              "value": "push",
              "label": "明明很累了还继续逼自己"
            }
          ]
        },
        {
          "id": "body_signal",
          "label": "身体最常给你的提醒",
          "type": "select",
          "options": [
            {
              "value": "sleep",
              "label": "睡不好/睡再多也不解乏"
            },
            {
              "value": "chest",
              "label": "胸口闷、心里一直发紧"
            },
            {
              "value": "head",
              "label": "脑子钝、注意力总散"
            },
            {
              "value": "stomach",
              "label": "胃口乱、肠胃容易不舒服"
            },
            {
              "value": "none",
              "label": "说不上明显身体信号，但就是不对劲"
            }
          ]
        },
        {
          "id": "main_need",
          "label": "你现在最想从回复里得到什么",
          "type": "select",
          "options": [
            {
              "value": "clarify",
              "label": "先看清我到底卡在哪"
            },
            {
              "value": "action",
              "label": "想要具体下一步"
            },
            {
              "value": "stop",
              "label": "想判断现在该不该停一下"
            },
            {
              "value": "priority",
              "label": "想知道最该先补哪一块"
            },
            {
              "value": "comfort",
              "label": "想被更清楚地理解一下"
            }
          ]
        },
        {
          "id": "story",
          "label": "把最近最真实的一段状态写下来",
          "type": "textarea",
          "placeholder": "比如最近总在想什么、最难受的时刻是什么、你已经试过什么。"
        },
        {
          "id": "wish",
          "label": "如果一周后能好一点，你希望具体好在哪",
          "type": "textarea",
          "placeholder": "比如：想能睡着、想能启动、想没那么拧巴。"
        }
      ]
    },
    {
      "slug": "self-05",
      "title": "我该怎么跟自己和解",
      "subtitle": "适合对自己很苛刻、一直在拧巴的人。",
      "category": "自我状态",
      "collection": "焦虑与内耗",
      "consultFocus": "从压力源、内耗模式和恢复需求判断当下真正卡点",
      "formIntro": "先把你的状态、最常出现的回路和身体信号说出来，回复会更像真的在对症拆解。",
      "responseIntro": "这里不是诊断，而是帮你辨认：你到底在被什么卡住、现在最该先照顾哪一块。",
      "followupPlaceholder": "继续追问，例如：如果我只能先做一件事，应该先动哪一步？",
      "followupSuggestions": [
        "如果我这周只能先做一件事，最值得先做什么？",
        "我怎么判断自己是在逃避，还是确实该停一下？"
      ],
      "quickPrompts": [
        "我明明没发生什么大事，但就是一直很紧。",
        "我知道自己该动，可就是迟迟启动不了。",
        "我最近像在靠意志硬拖着自己往前走。"
      ],
      "palette": {
        "accent": "#7b79ff",
        "accentSoft": "rgba(123, 121, 255, 0.16)",
        "accentStrong": "#4d47d8",
        "glow": "rgba(123, 121, 255, 0.28)"
      },
      "fields": [
        {
          "id": "state",
          "label": "你最近最像哪种状态",
          "type": "select",
          "options": [
            {
              "value": "anxious",
              "label": "焦虑，脑子一直在转"
            },
            {
              "value": "tired",
              "label": "疲惫，像一直在硬撑"
            },
            {
              "value": "stuck",
              "label": "卡住，明知道要动却动不了"
            },
            {
              "value": "numb",
              "label": "麻木，很多事都提不起劲"
            },
            {
              "value": "mixed",
              "label": "混合型，说不上来是哪一种"
            }
          ]
        },
        {
          "id": "loop",
          "label": "你最常陷进去的回路",
          "type": "select",
          "options": [
            {
              "value": "overthink",
              "label": "反复想，但不落地"
            },
            {
              "value": "delay",
              "label": "一拖再拖，越拖越重"
            },
            {
              "value": "self-critic",
              "label": "老觉得自己不够好"
            },
            {
              "value": "escape",
              "label": "总想逃开当下环境"
            },
            {
              "value": "push",
              "label": "明明很累了还继续逼自己"
            }
          ]
        },
        {
          "id": "body_signal",
          "label": "身体最常给你的提醒",
          "type": "select",
          "options": [
            {
              "value": "sleep",
              "label": "睡不好/睡再多也不解乏"
            },
            {
              "value": "chest",
              "label": "胸口闷、心里一直发紧"
            },
            {
              "value": "head",
              "label": "脑子钝、注意力总散"
            },
            {
              "value": "stomach",
              "label": "胃口乱、肠胃容易不舒服"
            },
            {
              "value": "none",
              "label": "说不上明显身体信号，但就是不对劲"
            }
          ]
        },
        {
          "id": "main_need",
          "label": "你现在最想从回复里得到什么",
          "type": "select",
          "options": [
            {
              "value": "clarify",
              "label": "先看清我到底卡在哪"
            },
            {
              "value": "action",
              "label": "想要具体下一步"
            },
            {
              "value": "stop",
              "label": "想判断现在该不该停一下"
            },
            {
              "value": "priority",
              "label": "想知道最该先补哪一块"
            },
            {
              "value": "comfort",
              "label": "想被更清楚地理解一下"
            }
          ]
        },
        {
          "id": "story",
          "label": "把最近最真实的一段状态写下来",
          "type": "textarea",
          "placeholder": "比如最近总在想什么、最难受的时刻是什么、你已经试过什么。"
        },
        {
          "id": "wish",
          "label": "如果一周后能好一点，你希望具体好在哪",
          "type": "textarea",
          "placeholder": "比如：想能睡着、想能启动、想没那么拧巴。"
        }
      ]
    },
    {
      "slug": "work-01",
      "title": "我适合现在裸辞吗",
      "subtitle": "从现实缓冲和身体代价一起看，不只看情绪。",
      "category": "工作决策",
      "collection": "去留与机会",
      "consultFocus": "从现金流、恢复力、成长性和现实约束判断决策空间",
      "formIntro": "这类问题最怕热血化判断，所以会先让你把成本、机会和身体感受一起摆出来。",
      "responseIntro": "这里的目标不是替你冲动做决定，而是把“能不能动、值不值得动、先怎么动”分开看。",
      "followupPlaceholder": "继续追问，例如：如果我想先试探性行动，第一周该做什么？",
      "followupSuggestions": [
        "如果我暂时不辞，那我第一周该怎么做止损动作？",
        "如果我准备转向，我最该先验证哪件事？"
      ],
      "quickPrompts": [
        "我知道这份工作在耗我，但我又怕出去更差。",
        "我不确定自己是真的想走，还是只是累到了极点。",
        "我现在最怕的不是辛苦，是继续这样下去会越来越麻木。"
      ],
      "palette": {
        "accent": "#ff9155",
        "accentSoft": "rgba(255, 145, 85, 0.16)",
        "accentStrong": "#d45a14",
        "glow": "rgba(255, 145, 85, 0.28)"
      },
      "fields": [
        {
          "id": "stage",
          "label": "你现在面对的工作问题更像哪种",
          "type": "select",
          "options": [
            {
              "value": "quit",
              "label": "在想要不要离开/裸辞"
            },
            {
              "value": "switch",
              "label": "在想要不要转行"
            },
            {
              "value": "offer",
              "label": "在比较一个新机会要不要接"
            },
            {
              "value": "side",
              "label": "想知道副业现在该不该开"
            },
            {
              "value": "drain",
              "label": "主要是想判断这份工作是不是在消耗我"
            }
          ]
        },
        {
          "id": "team_pattern",
          "label": "当前环境最明显的问题",
          "type": "select",
          "options": [
            {
              "value": "chaos",
              "label": "混乱、反复、节奏失控"
            },
            {
              "value": "ceiling",
              "label": "天花板明显，成长停了"
            },
            {
              "value": "toxic",
              "label": "人和关系让人长期不舒服"
            },
            {
              "value": "money",
              "label": "回报配不上投入"
            },
            {
              "value": "unclear",
              "label": "不一定是环境差，但我自己越来越拧巴"
            }
          ]
        },
        {
          "id": "body_cost",
          "label": "这份工作对你的消耗最像哪种",
          "type": "select",
          "options": [
            {
              "value": "sleep",
              "label": "睡眠和身体状态明显变差"
            },
            {
              "value": "emotion",
              "label": "情绪起伏大、常常烦躁或压抑"
            },
            {
              "value": "meaning",
              "label": "做着做着越来越空、越来越麻"
            },
            {
              "value": "time",
              "label": "私人时间被吞得很厉害"
            },
            {
              "value": "mixed",
              "label": "几种消耗叠在一起"
            }
          ]
        },
        {
          "id": "realistic_space",
          "label": "你现在手上现实腾挪空间如何",
          "type": "select",
          "options": [
            {
              "value": "safe",
              "label": "有存款/有缓冲，能动一动"
            },
            {
              "value": "medium",
              "label": "能撑一阵，但不能太久"
            },
            {
              "value": "tight",
              "label": "现金流很紧，不能随便冒险"
            },
            {
              "value": "support",
              "label": "有人能托底一部分"
            },
            {
              "value": "unknown",
              "label": "我也没认真算过自己的空间"
            }
          ]
        },
        {
          "id": "story",
          "label": "把最近让你最想逃开的工作片段写出来",
          "type": "textarea",
          "placeholder": "比如：最近一次崩溃点、你最想离开的原因、你最怕失去的东西。"
        },
        {
          "id": "wish",
          "label": "你最想从这次咨询里得到什么",
          "type": "textarea",
          "placeholder": "比如：想判断现在能不能辞、想知道先苟还是先动、想找一个过渡方案。"
        }
      ]
    },
    {
      "slug": "work-02",
      "title": "这份工作是不是在消耗我",
      "subtitle": "把“正常累”和“长期消耗”分开看。",
      "category": "工作决策",
      "collection": "去留与机会",
      "consultFocus": "从现金流、恢复力、成长性和现实约束判断决策空间",
      "formIntro": "这类问题最怕热血化判断，所以会先让你把成本、机会和身体感受一起摆出来。",
      "responseIntro": "这里的目标不是替你冲动做决定，而是把“能不能动、值不值得动、先怎么动”分开看。",
      "followupPlaceholder": "继续追问，例如：如果我想先试探性行动，第一周该做什么？",
      "followupSuggestions": [
        "如果我暂时不辞，那我第一周该怎么做止损动作？",
        "如果我准备转向，我最该先验证哪件事？"
      ],
      "quickPrompts": [
        "我知道这份工作在耗我，但我又怕出去更差。",
        "我不确定自己是真的想走，还是只是累到了极点。",
        "我现在最怕的不是辛苦，是继续这样下去会越来越麻木。"
      ],
      "palette": {
        "accent": "#ff9155",
        "accentSoft": "rgba(255, 145, 85, 0.16)",
        "accentStrong": "#d45a14",
        "glow": "rgba(255, 145, 85, 0.28)"
      },
      "fields": [
        {
          "id": "stage",
          "label": "你现在面对的工作问题更像哪种",
          "type": "select",
          "options": [
            {
              "value": "quit",
              "label": "在想要不要离开/裸辞"
            },
            {
              "value": "switch",
              "label": "在想要不要转行"
            },
            {
              "value": "offer",
              "label": "在比较一个新机会要不要接"
            },
            {
              "value": "side",
              "label": "想知道副业现在该不该开"
            },
            {
              "value": "drain",
              "label": "主要是想判断这份工作是不是在消耗我"
            }
          ]
        },
        {
          "id": "team_pattern",
          "label": "当前环境最明显的问题",
          "type": "select",
          "options": [
            {
              "value": "chaos",
              "label": "混乱、反复、节奏失控"
            },
            {
              "value": "ceiling",
              "label": "天花板明显，成长停了"
            },
            {
              "value": "toxic",
              "label": "人和关系让人长期不舒服"
            },
            {
              "value": "money",
              "label": "回报配不上投入"
            },
            {
              "value": "unclear",
              "label": "不一定是环境差，但我自己越来越拧巴"
            }
          ]
        },
        {
          "id": "body_cost",
          "label": "这份工作对你的消耗最像哪种",
          "type": "select",
          "options": [
            {
              "value": "sleep",
              "label": "睡眠和身体状态明显变差"
            },
            {
              "value": "emotion",
              "label": "情绪起伏大、常常烦躁或压抑"
            },
            {
              "value": "meaning",
              "label": "做着做着越来越空、越来越麻"
            },
            {
              "value": "time",
              "label": "私人时间被吞得很厉害"
            },
            {
              "value": "mixed",
              "label": "几种消耗叠在一起"
            }
          ]
        },
        {
          "id": "realistic_space",
          "label": "你现在手上现实腾挪空间如何",
          "type": "select",
          "options": [
            {
              "value": "safe",
              "label": "有存款/有缓冲，能动一动"
            },
            {
              "value": "medium",
              "label": "能撑一阵，但不能太久"
            },
            {
              "value": "tight",
              "label": "现金流很紧，不能随便冒险"
            },
            {
              "value": "support",
              "label": "有人能托底一部分"
            },
            {
              "value": "unknown",
              "label": "我也没认真算过自己的空间"
            }
          ]
        },
        {
          "id": "story",
          "label": "把最近让你最想逃开的工作片段写出来",
          "type": "textarea",
          "placeholder": "比如：最近一次崩溃点、你最想离开的原因、你最怕失去的东西。"
        },
        {
          "id": "wish",
          "label": "你最想从这次咨询里得到什么",
          "type": "textarea",
          "placeholder": "比如：想判断现在能不能辞、想知道先苟还是先动、想找一个过渡方案。"
        }
      ]
    },
    {
      "slug": "work-03",
      "title": "我到底要不要转行",
      "subtitle": "适合卡在不甘心、怕重来、又待不住的人。",
      "category": "工作决策",
      "collection": "去留与机会",
      "consultFocus": "从现金流、恢复力、成长性和现实约束判断决策空间",
      "formIntro": "这类问题最怕热血化判断，所以会先让你把成本、机会和身体感受一起摆出来。",
      "responseIntro": "这里的目标不是替你冲动做决定，而是把“能不能动、值不值得动、先怎么动”分开看。",
      "followupPlaceholder": "继续追问，例如：如果我想先试探性行动，第一周该做什么？",
      "followupSuggestions": [
        "如果我暂时不辞，那我第一周该怎么做止损动作？",
        "如果我准备转向，我最该先验证哪件事？"
      ],
      "quickPrompts": [
        "我知道这份工作在耗我，但我又怕出去更差。",
        "我不确定自己是真的想走，还是只是累到了极点。",
        "我现在最怕的不是辛苦，是继续这样下去会越来越麻木。"
      ],
      "palette": {
        "accent": "#ff9155",
        "accentSoft": "rgba(255, 145, 85, 0.16)",
        "accentStrong": "#d45a14",
        "glow": "rgba(255, 145, 85, 0.28)"
      },
      "fields": [
        {
          "id": "stage",
          "label": "你现在面对的工作问题更像哪种",
          "type": "select",
          "options": [
            {
              "value": "quit",
              "label": "在想要不要离开/裸辞"
            },
            {
              "value": "switch",
              "label": "在想要不要转行"
            },
            {
              "value": "offer",
              "label": "在比较一个新机会要不要接"
            },
            {
              "value": "side",
              "label": "想知道副业现在该不该开"
            },
            {
              "value": "drain",
              "label": "主要是想判断这份工作是不是在消耗我"
            }
          ]
        },
        {
          "id": "team_pattern",
          "label": "当前环境最明显的问题",
          "type": "select",
          "options": [
            {
              "value": "chaos",
              "label": "混乱、反复、节奏失控"
            },
            {
              "value": "ceiling",
              "label": "天花板明显，成长停了"
            },
            {
              "value": "toxic",
              "label": "人和关系让人长期不舒服"
            },
            {
              "value": "money",
              "label": "回报配不上投入"
            },
            {
              "value": "unclear",
              "label": "不一定是环境差，但我自己越来越拧巴"
            }
          ]
        },
        {
          "id": "body_cost",
          "label": "这份工作对你的消耗最像哪种",
          "type": "select",
          "options": [
            {
              "value": "sleep",
              "label": "睡眠和身体状态明显变差"
            },
            {
              "value": "emotion",
              "label": "情绪起伏大、常常烦躁或压抑"
            },
            {
              "value": "meaning",
              "label": "做着做着越来越空、越来越麻"
            },
            {
              "value": "time",
              "label": "私人时间被吞得很厉害"
            },
            {
              "value": "mixed",
              "label": "几种消耗叠在一起"
            }
          ]
        },
        {
          "id": "realistic_space",
          "label": "你现在手上现实腾挪空间如何",
          "type": "select",
          "options": [
            {
              "value": "safe",
              "label": "有存款/有缓冲，能动一动"
            },
            {
              "value": "medium",
              "label": "能撑一阵，但不能太久"
            },
            {
              "value": "tight",
              "label": "现金流很紧，不能随便冒险"
            },
            {
              "value": "support",
              "label": "有人能托底一部分"
            },
            {
              "value": "unknown",
              "label": "我也没认真算过自己的空间"
            }
          ]
        },
        {
          "id": "story",
          "label": "把最近让你最想逃开的工作片段写出来",
          "type": "textarea",
          "placeholder": "比如：最近一次崩溃点、你最想离开的原因、你最怕失去的东西。"
        },
        {
          "id": "wish",
          "label": "你最想从这次咨询里得到什么",
          "type": "textarea",
          "placeholder": "比如：想判断现在能不能辞、想知道先苟还是先动、想找一个过渡方案。"
        }
      ]
    },
    {
      "slug": "work-04",
      "title": "副业现在该不该开始",
      "subtitle": "帮你看这是机会窗口，还是又一个新负担。",
      "category": "工作决策",
      "collection": "去留与机会",
      "consultFocus": "从现金流、恢复力、成长性和现实约束判断决策空间",
      "formIntro": "这类问题最怕热血化判断，所以会先让你把成本、机会和身体感受一起摆出来。",
      "responseIntro": "这里的目标不是替你冲动做决定，而是把“能不能动、值不值得动、先怎么动”分开看。",
      "followupPlaceholder": "继续追问，例如：如果我想先试探性行动，第一周该做什么？",
      "followupSuggestions": [
        "如果我暂时不辞，那我第一周该怎么做止损动作？",
        "如果我准备转向，我最该先验证哪件事？"
      ],
      "quickPrompts": [
        "我知道这份工作在耗我，但我又怕出去更差。",
        "我不确定自己是真的想走，还是只是累到了极点。",
        "我现在最怕的不是辛苦，是继续这样下去会越来越麻木。"
      ],
      "palette": {
        "accent": "#ff9155",
        "accentSoft": "rgba(255, 145, 85, 0.16)",
        "accentStrong": "#d45a14",
        "glow": "rgba(255, 145, 85, 0.28)"
      },
      "fields": [
        {
          "id": "stage",
          "label": "你现在面对的工作问题更像哪种",
          "type": "select",
          "options": [
            {
              "value": "quit",
              "label": "在想要不要离开/裸辞"
            },
            {
              "value": "switch",
              "label": "在想要不要转行"
            },
            {
              "value": "offer",
              "label": "在比较一个新机会要不要接"
            },
            {
              "value": "side",
              "label": "想知道副业现在该不该开"
            },
            {
              "value": "drain",
              "label": "主要是想判断这份工作是不是在消耗我"
            }
          ]
        },
        {
          "id": "team_pattern",
          "label": "当前环境最明显的问题",
          "type": "select",
          "options": [
            {
              "value": "chaos",
              "label": "混乱、反复、节奏失控"
            },
            {
              "value": "ceiling",
              "label": "天花板明显，成长停了"
            },
            {
              "value": "toxic",
              "label": "人和关系让人长期不舒服"
            },
            {
              "value": "money",
              "label": "回报配不上投入"
            },
            {
              "value": "unclear",
              "label": "不一定是环境差，但我自己越来越拧巴"
            }
          ]
        },
        {
          "id": "body_cost",
          "label": "这份工作对你的消耗最像哪种",
          "type": "select",
          "options": [
            {
              "value": "sleep",
              "label": "睡眠和身体状态明显变差"
            },
            {
              "value": "emotion",
              "label": "情绪起伏大、常常烦躁或压抑"
            },
            {
              "value": "meaning",
              "label": "做着做着越来越空、越来越麻"
            },
            {
              "value": "time",
              "label": "私人时间被吞得很厉害"
            },
            {
              "value": "mixed",
              "label": "几种消耗叠在一起"
            }
          ]
        },
        {
          "id": "realistic_space",
          "label": "你现在手上现实腾挪空间如何",
          "type": "select",
          "options": [
            {
              "value": "safe",
              "label": "有存款/有缓冲，能动一动"
            },
            {
              "value": "medium",
              "label": "能撑一阵，但不能太久"
            },
            {
              "value": "tight",
              "label": "现金流很紧，不能随便冒险"
            },
            {
              "value": "support",
              "label": "有人能托底一部分"
            },
            {
              "value": "unknown",
              "label": "我也没认真算过自己的空间"
            }
          ]
        },
        {
          "id": "story",
          "label": "把最近让你最想逃开的工作片段写出来",
          "type": "textarea",
          "placeholder": "比如：最近一次崩溃点、你最想离开的原因、你最怕失去的东西。"
        },
        {
          "id": "wish",
          "label": "你最想从这次咨询里得到什么",
          "type": "textarea",
          "placeholder": "比如：想判断现在能不能辞、想知道先苟还是先动、想找一个过渡方案。"
        }
      ]
    },
    {
      "slug": "work-05",
      "title": "这个机会我要不要接",
      "subtitle": "适合面对 offer、新项目或新岗位时的判断入口。",
      "category": "工作决策",
      "collection": "去留与机会",
      "consultFocus": "从现金流、恢复力、成长性和现实约束判断决策空间",
      "formIntro": "这类问题最怕热血化判断，所以会先让你把成本、机会和身体感受一起摆出来。",
      "responseIntro": "这里的目标不是替你冲动做决定，而是把“能不能动、值不值得动、先怎么动”分开看。",
      "followupPlaceholder": "继续追问，例如：如果我想先试探性行动，第一周该做什么？",
      "followupSuggestions": [
        "如果我暂时不辞，那我第一周该怎么做止损动作？",
        "如果我准备转向，我最该先验证哪件事？"
      ],
      "quickPrompts": [
        "我知道这份工作在耗我，但我又怕出去更差。",
        "我不确定自己是真的想走，还是只是累到了极点。",
        "我现在最怕的不是辛苦，是继续这样下去会越来越麻木。"
      ],
      "palette": {
        "accent": "#ff9155",
        "accentSoft": "rgba(255, 145, 85, 0.16)",
        "accentStrong": "#d45a14",
        "glow": "rgba(255, 145, 85, 0.28)"
      },
      "fields": [
        {
          "id": "stage",
          "label": "你现在面对的工作问题更像哪种",
          "type": "select",
          "options": [
            {
              "value": "quit",
              "label": "在想要不要离开/裸辞"
            },
            {
              "value": "switch",
              "label": "在想要不要转行"
            },
            {
              "value": "offer",
              "label": "在比较一个新机会要不要接"
            },
            {
              "value": "side",
              "label": "想知道副业现在该不该开"
            },
            {
              "value": "drain",
              "label": "主要是想判断这份工作是不是在消耗我"
            }
          ]
        },
        {
          "id": "team_pattern",
          "label": "当前环境最明显的问题",
          "type": "select",
          "options": [
            {
              "value": "chaos",
              "label": "混乱、反复、节奏失控"
            },
            {
              "value": "ceiling",
              "label": "天花板明显，成长停了"
            },
            {
              "value": "toxic",
              "label": "人和关系让人长期不舒服"
            },
            {
              "value": "money",
              "label": "回报配不上投入"
            },
            {
              "value": "unclear",
              "label": "不一定是环境差，但我自己越来越拧巴"
            }
          ]
        },
        {
          "id": "body_cost",
          "label": "这份工作对你的消耗最像哪种",
          "type": "select",
          "options": [
            {
              "value": "sleep",
              "label": "睡眠和身体状态明显变差"
            },
            {
              "value": "emotion",
              "label": "情绪起伏大、常常烦躁或压抑"
            },
            {
              "value": "meaning",
              "label": "做着做着越来越空、越来越麻"
            },
            {
              "value": "time",
              "label": "私人时间被吞得很厉害"
            },
            {
              "value": "mixed",
              "label": "几种消耗叠在一起"
            }
          ]
        },
        {
          "id": "realistic_space",
          "label": "你现在手上现实腾挪空间如何",
          "type": "select",
          "options": [
            {
              "value": "safe",
              "label": "有存款/有缓冲，能动一动"
            },
            {
              "value": "medium",
              "label": "能撑一阵，但不能太久"
            },
            {
              "value": "tight",
              "label": "现金流很紧，不能随便冒险"
            },
            {
              "value": "support",
              "label": "有人能托底一部分"
            },
            {
              "value": "unknown",
              "label": "我也没认真算过自己的空间"
            }
          ]
        },
        {
          "id": "story",
          "label": "把最近让你最想逃开的工作片段写出来",
          "type": "textarea",
          "placeholder": "比如：最近一次崩溃点、你最想离开的原因、你最怕失去的东西。"
        },
        {
          "id": "wish",
          "label": "你最想从这次咨询里得到什么",
          "type": "textarea",
          "placeholder": "比如：想判断现在能不能辞、想知道先苟还是先动、想找一个过渡方案。"
        }
      ]
    },
    {
      "slug": "city-01",
      "title": "我要不要换城市",
      "subtitle": "把逃离冲动、现实代价和真正需求拆开看。",
      "category": "城市与生活",
      "collection": "居住决策",
      "consultFocus": "从环境压力、生活成本和恢复方式判断更适合的落脚方案",
      "formIntro": "城市和住法问题不只是地点选择，本质上是你怎么安排自己的日常能量。",
      "responseIntro": "回复会更偏生活结构咨询，帮你判断到底是环境不对、节奏不对，还是你已经累过头了。",
      "followupPlaceholder": "继续追问，例如：如果我暂时不换城市，我怎么先把现在的日常救回来？",
      "followupSuggestions": [
        "如果我短期还走不了，我怎么先把生活损耗降下来？",
        "我最适合先改居住方式，还是先改城市节奏？"
      ],
      "quickPrompts": [
        "我最近总想逃离，但又说不清自己到底想去哪里。",
        "我不确定自己是不适合这座城，还是只是最近太累。",
        "我越来越觉得每天的生活像在消耗而不是在建设自己。"
      ],
      "palette": {
        "accent": "#35a7ff",
        "accentSoft": "rgba(53, 167, 255, 0.16)",
        "accentStrong": "#0d70c8",
        "glow": "rgba(53, 167, 255, 0.28)"
      },
      "fields": [
        {
          "id": "life_stage",
          "label": "你现在的生活阶段更接近哪种",
          "type": "select",
          "options": [
            {
              "value": "fresh",
              "label": "刚开始独立生活/刚到新环境"
            },
            {
              "value": "middle",
              "label": "已经住了一阵，开始重新评估"
            },
            {
              "value": "stuck",
              "label": "待久了，越来越想逃"
            },
            {
              "value": "move-soon",
              "label": "近期就得做搬家/换城决定"
            },
            {
              "value": "mixed",
              "label": "多个问题叠在一起，很乱"
            }
          ]
        },
        {
          "id": "pressure",
          "label": "当前最大的生活压力来自哪里",
          "type": "select",
          "options": [
            {
              "value": "rent",
              "label": "房租/生活成本"
            },
            {
              "value": "commute",
              "label": "通勤和日常移动"
            },
            {
              "value": "lonely",
              "label": "孤独感/没有支点"
            },
            {
              "value": "density",
              "label": "城市节奏太快/信息太多"
            },
            {
              "value": "unclear",
              "label": "说不清，但整个人一直在耗"
            }
          ]
        },
        {
          "id": "home_need",
          "label": "你现在最想从生活环境里得到什么",
          "type": "select",
          "options": [
            {
              "value": "quiet",
              "label": "安静、低耗、能休息"
            },
            {
              "value": "opportunity",
              "label": "机会、资源、更多选择"
            },
            {
              "value": "comfort",
              "label": "住得更舒服、更像家"
            },
            {
              "value": "flex",
              "label": "更灵活，别被成本困太死"
            },
            {
              "value": "people",
              "label": "熟悉感和人与人的连接"
            }
          ]
        },
        {
          "id": "decision",
          "label": "这次你最卡的决定是什么",
          "type": "select",
          "options": [
            {
              "value": "move-city",
              "label": "要不要换城市"
            },
            {
              "value": "alone-share",
              "label": "独居还是合租"
            },
            {
              "value": "rest-away",
              "label": "是不是该离开一阵"
            },
            {
              "value": "stay",
              "label": "要不要先继续待着观察"
            },
            {
              "value": "where-fit",
              "label": "搞清楚自己到底适合哪种城市"
            }
          ]
        },
        {
          "id": "story",
          "label": "最近最让你想逃开的生活片段",
          "type": "textarea",
          "placeholder": "写下最近某个瞬间：你为什么忽然很想离开，或者为什么开始怀疑这里不适合你。"
        },
        {
          "id": "wish",
          "label": "如果生活能重新顺一点，你最想先变好的是什么",
          "type": "textarea",
          "placeholder": "比如：想更好睡、想少通勤、想有空间感、想没那么孤单。"
        }
      ]
    },
    {
      "slug": "city-02",
      "title": "我适合独居还是合租",
      "subtitle": "判断你更该把钱花在空间，还是花在缓冲压力上。",
      "category": "城市与生活",
      "collection": "居住决策",
      "consultFocus": "从环境压力、生活成本和恢复方式判断更适合的落脚方案",
      "formIntro": "城市和住法问题不只是地点选择，本质上是你怎么安排自己的日常能量。",
      "responseIntro": "回复会更偏生活结构咨询，帮你判断到底是环境不对、节奏不对，还是你已经累过头了。",
      "followupPlaceholder": "继续追问，例如：如果我暂时不换城市，我怎么先把现在的日常救回来？",
      "followupSuggestions": [
        "如果我短期还走不了，我怎么先把生活损耗降下来？",
        "我最适合先改居住方式，还是先改城市节奏？"
      ],
      "quickPrompts": [
        "我最近总想逃离，但又说不清自己到底想去哪里。",
        "我不确定自己是不适合这座城，还是只是最近太累。",
        "我越来越觉得每天的生活像在消耗而不是在建设自己。"
      ],
      "palette": {
        "accent": "#35a7ff",
        "accentSoft": "rgba(53, 167, 255, 0.16)",
        "accentStrong": "#0d70c8",
        "glow": "rgba(53, 167, 255, 0.28)"
      },
      "fields": [
        {
          "id": "life_stage",
          "label": "你现在的生活阶段更接近哪种",
          "type": "select",
          "options": [
            {
              "value": "fresh",
              "label": "刚开始独立生活/刚到新环境"
            },
            {
              "value": "middle",
              "label": "已经住了一阵，开始重新评估"
            },
            {
              "value": "stuck",
              "label": "待久了，越来越想逃"
            },
            {
              "value": "move-soon",
              "label": "近期就得做搬家/换城决定"
            },
            {
              "value": "mixed",
              "label": "多个问题叠在一起，很乱"
            }
          ]
        },
        {
          "id": "pressure",
          "label": "当前最大的生活压力来自哪里",
          "type": "select",
          "options": [
            {
              "value": "rent",
              "label": "房租/生活成本"
            },
            {
              "value": "commute",
              "label": "通勤和日常移动"
            },
            {
              "value": "lonely",
              "label": "孤独感/没有支点"
            },
            {
              "value": "density",
              "label": "城市节奏太快/信息太多"
            },
            {
              "value": "unclear",
              "label": "说不清，但整个人一直在耗"
            }
          ]
        },
        {
          "id": "home_need",
          "label": "你现在最想从生活环境里得到什么",
          "type": "select",
          "options": [
            {
              "value": "quiet",
              "label": "安静、低耗、能休息"
            },
            {
              "value": "opportunity",
              "label": "机会、资源、更多选择"
            },
            {
              "value": "comfort",
              "label": "住得更舒服、更像家"
            },
            {
              "value": "flex",
              "label": "更灵活，别被成本困太死"
            },
            {
              "value": "people",
              "label": "熟悉感和人与人的连接"
            }
          ]
        },
        {
          "id": "decision",
          "label": "这次你最卡的决定是什么",
          "type": "select",
          "options": [
            {
              "value": "move-city",
              "label": "要不要换城市"
            },
            {
              "value": "alone-share",
              "label": "独居还是合租"
            },
            {
              "value": "rest-away",
              "label": "是不是该离开一阵"
            },
            {
              "value": "stay",
              "label": "要不要先继续待着观察"
            },
            {
              "value": "where-fit",
              "label": "搞清楚自己到底适合哪种城市"
            }
          ]
        },
        {
          "id": "story",
          "label": "最近最让你想逃开的生活片段",
          "type": "textarea",
          "placeholder": "写下最近某个瞬间：你为什么忽然很想离开，或者为什么开始怀疑这里不适合你。"
        },
        {
          "id": "wish",
          "label": "如果生活能重新顺一点，你最想先变好的是什么",
          "type": "textarea",
          "placeholder": "比如：想更好睡、想少通勤、想有空间感、想没那么孤单。"
        }
      ]
    },
    {
      "slug": "city-03",
      "title": "最近总想逃离是为什么",
      "subtitle": "看看你是环境不对、节奏不对，还是已经累过头。",
      "category": "城市与生活",
      "collection": "居住决策",
      "consultFocus": "从环境压力、生活成本和恢复方式判断更适合的落脚方案",
      "formIntro": "城市和住法问题不只是地点选择，本质上是你怎么安排自己的日常能量。",
      "responseIntro": "回复会更偏生活结构咨询，帮你判断到底是环境不对、节奏不对，还是你已经累过头了。",
      "followupPlaceholder": "继续追问，例如：如果我暂时不换城市，我怎么先把现在的日常救回来？",
      "followupSuggestions": [
        "如果我短期还走不了，我怎么先把生活损耗降下来？",
        "我最适合先改居住方式，还是先改城市节奏？"
      ],
      "quickPrompts": [
        "我最近总想逃离，但又说不清自己到底想去哪里。",
        "我不确定自己是不适合这座城，还是只是最近太累。",
        "我越来越觉得每天的生活像在消耗而不是在建设自己。"
      ],
      "palette": {
        "accent": "#35a7ff",
        "accentSoft": "rgba(53, 167, 255, 0.16)",
        "accentStrong": "#0d70c8",
        "glow": "rgba(53, 167, 255, 0.28)"
      },
      "fields": [
        {
          "id": "life_stage",
          "label": "你现在的生活阶段更接近哪种",
          "type": "select",
          "options": [
            {
              "value": "fresh",
              "label": "刚开始独立生活/刚到新环境"
            },
            {
              "value": "middle",
              "label": "已经住了一阵，开始重新评估"
            },
            {
              "value": "stuck",
              "label": "待久了，越来越想逃"
            },
            {
              "value": "move-soon",
              "label": "近期就得做搬家/换城决定"
            },
            {
              "value": "mixed",
              "label": "多个问题叠在一起，很乱"
            }
          ]
        },
        {
          "id": "pressure",
          "label": "当前最大的生活压力来自哪里",
          "type": "select",
          "options": [
            {
              "value": "rent",
              "label": "房租/生活成本"
            },
            {
              "value": "commute",
              "label": "通勤和日常移动"
            },
            {
              "value": "lonely",
              "label": "孤独感/没有支点"
            },
            {
              "value": "density",
              "label": "城市节奏太快/信息太多"
            },
            {
              "value": "unclear",
              "label": "说不清，但整个人一直在耗"
            }
          ]
        },
        {
          "id": "home_need",
          "label": "你现在最想从生活环境里得到什么",
          "type": "select",
          "options": [
            {
              "value": "quiet",
              "label": "安静、低耗、能休息"
            },
            {
              "value": "opportunity",
              "label": "机会、资源、更多选择"
            },
            {
              "value": "comfort",
              "label": "住得更舒服、更像家"
            },
            {
              "value": "flex",
              "label": "更灵活，别被成本困太死"
            },
            {
              "value": "people",
              "label": "熟悉感和人与人的连接"
            }
          ]
        },
        {
          "id": "decision",
          "label": "这次你最卡的决定是什么",
          "type": "select",
          "options": [
            {
              "value": "move-city",
              "label": "要不要换城市"
            },
            {
              "value": "alone-share",
              "label": "独居还是合租"
            },
            {
              "value": "rest-away",
              "label": "是不是该离开一阵"
            },
            {
              "value": "stay",
              "label": "要不要先继续待着观察"
            },
            {
              "value": "where-fit",
              "label": "搞清楚自己到底适合哪种城市"
            }
          ]
        },
        {
          "id": "story",
          "label": "最近最让你想逃开的生活片段",
          "type": "textarea",
          "placeholder": "写下最近某个瞬间：你为什么忽然很想离开，或者为什么开始怀疑这里不适合你。"
        },
        {
          "id": "wish",
          "label": "如果生活能重新顺一点，你最想先变好的是什么",
          "type": "textarea",
          "placeholder": "比如：想更好睡、想少通勤、想有空间感、想没那么孤单。"
        }
      ]
    },
    {
      "slug": "city-04",
      "title": "我适合什么样的城市",
      "subtitle": "不是城市排名，而是你和哪种生活密度最匹配。",
      "category": "城市与生活",
      "collection": "居住决策",
      "consultFocus": "从环境压力、生活成本和恢复方式判断更适合的落脚方案",
      "formIntro": "城市和住法问题不只是地点选择，本质上是你怎么安排自己的日常能量。",
      "responseIntro": "回复会更偏生活结构咨询，帮你判断到底是环境不对、节奏不对，还是你已经累过头了。",
      "followupPlaceholder": "继续追问，例如：如果我暂时不换城市，我怎么先把现在的日常救回来？",
      "followupSuggestions": [
        "如果我短期还走不了，我怎么先把生活损耗降下来？",
        "我最适合先改居住方式，还是先改城市节奏？"
      ],
      "quickPrompts": [
        "我最近总想逃离，但又说不清自己到底想去哪里。",
        "我不确定自己是不适合这座城，还是只是最近太累。",
        "我越来越觉得每天的生活像在消耗而不是在建设自己。"
      ],
      "palette": {
        "accent": "#35a7ff",
        "accentSoft": "rgba(53, 167, 255, 0.16)",
        "accentStrong": "#0d70c8",
        "glow": "rgba(53, 167, 255, 0.28)"
      },
      "fields": [
        {
          "id": "life_stage",
          "label": "你现在的生活阶段更接近哪种",
          "type": "select",
          "options": [
            {
              "value": "fresh",
              "label": "刚开始独立生活/刚到新环境"
            },
            {
              "value": "middle",
              "label": "已经住了一阵，开始重新评估"
            },
            {
              "value": "stuck",
              "label": "待久了，越来越想逃"
            },
            {
              "value": "move-soon",
              "label": "近期就得做搬家/换城决定"
            },
            {
              "value": "mixed",
              "label": "多个问题叠在一起，很乱"
            }
          ]
        },
        {
          "id": "pressure",
          "label": "当前最大的生活压力来自哪里",
          "type": "select",
          "options": [
            {
              "value": "rent",
              "label": "房租/生活成本"
            },
            {
              "value": "commute",
              "label": "通勤和日常移动"
            },
            {
              "value": "lonely",
              "label": "孤独感/没有支点"
            },
            {
              "value": "density",
              "label": "城市节奏太快/信息太多"
            },
            {
              "value": "unclear",
              "label": "说不清，但整个人一直在耗"
            }
          ]
        },
        {
          "id": "home_need",
          "label": "你现在最想从生活环境里得到什么",
          "type": "select",
          "options": [
            {
              "value": "quiet",
              "label": "安静、低耗、能休息"
            },
            {
              "value": "opportunity",
              "label": "机会、资源、更多选择"
            },
            {
              "value": "comfort",
              "label": "住得更舒服、更像家"
            },
            {
              "value": "flex",
              "label": "更灵活，别被成本困太死"
            },
            {
              "value": "people",
              "label": "熟悉感和人与人的连接"
            }
          ]
        },
        {
          "id": "decision",
          "label": "这次你最卡的决定是什么",
          "type": "select",
          "options": [
            {
              "value": "move-city",
              "label": "要不要换城市"
            },
            {
              "value": "alone-share",
              "label": "独居还是合租"
            },
            {
              "value": "rest-away",
              "label": "是不是该离开一阵"
            },
            {
              "value": "stay",
              "label": "要不要先继续待着观察"
            },
            {
              "value": "where-fit",
              "label": "搞清楚自己到底适合哪种城市"
            }
          ]
        },
        {
          "id": "story",
          "label": "最近最让你想逃开的生活片段",
          "type": "textarea",
          "placeholder": "写下最近某个瞬间：你为什么忽然很想离开，或者为什么开始怀疑这里不适合你。"
        },
        {
          "id": "wish",
          "label": "如果生活能重新顺一点，你最想先变好的是什么",
          "type": "textarea",
          "placeholder": "比如：想更好睡、想少通勤、想有空间感、想没那么孤单。"
        }
      ]
    },
    {
      "slug": "city-05",
      "title": "我是不是该离开一阵",
      "subtitle": "适合想暂时出走、换环境、喘口气的人。",
      "category": "城市与生活",
      "collection": "居住决策",
      "consultFocus": "从环境压力、生活成本和恢复方式判断更适合的落脚方案",
      "formIntro": "城市和住法问题不只是地点选择，本质上是你怎么安排自己的日常能量。",
      "responseIntro": "回复会更偏生活结构咨询，帮你判断到底是环境不对、节奏不对，还是你已经累过头了。",
      "followupPlaceholder": "继续追问，例如：如果我暂时不换城市，我怎么先把现在的日常救回来？",
      "followupSuggestions": [
        "如果我短期还走不了，我怎么先把生活损耗降下来？",
        "我最适合先改居住方式，还是先改城市节奏？"
      ],
      "quickPrompts": [
        "我最近总想逃离，但又说不清自己到底想去哪里。",
        "我不确定自己是不适合这座城，还是只是最近太累。",
        "我越来越觉得每天的生活像在消耗而不是在建设自己。"
      ],
      "palette": {
        "accent": "#35a7ff",
        "accentSoft": "rgba(53, 167, 255, 0.16)",
        "accentStrong": "#0d70c8",
        "glow": "rgba(53, 167, 255, 0.28)"
      },
      "fields": [
        {
          "id": "life_stage",
          "label": "你现在的生活阶段更接近哪种",
          "type": "select",
          "options": [
            {
              "value": "fresh",
              "label": "刚开始独立生活/刚到新环境"
            },
            {
              "value": "middle",
              "label": "已经住了一阵，开始重新评估"
            },
            {
              "value": "stuck",
              "label": "待久了，越来越想逃"
            },
            {
              "value": "move-soon",
              "label": "近期就得做搬家/换城决定"
            },
            {
              "value": "mixed",
              "label": "多个问题叠在一起，很乱"
            }
          ]
        },
        {
          "id": "pressure",
          "label": "当前最大的生活压力来自哪里",
          "type": "select",
          "options": [
            {
              "value": "rent",
              "label": "房租/生活成本"
            },
            {
              "value": "commute",
              "label": "通勤和日常移动"
            },
            {
              "value": "lonely",
              "label": "孤独感/没有支点"
            },
            {
              "value": "density",
              "label": "城市节奏太快/信息太多"
            },
            {
              "value": "unclear",
              "label": "说不清，但整个人一直在耗"
            }
          ]
        },
        {
          "id": "home_need",
          "label": "你现在最想从生活环境里得到什么",
          "type": "select",
          "options": [
            {
              "value": "quiet",
              "label": "安静、低耗、能休息"
            },
            {
              "value": "opportunity",
              "label": "机会、资源、更多选择"
            },
            {
              "value": "comfort",
              "label": "住得更舒服、更像家"
            },
            {
              "value": "flex",
              "label": "更灵活，别被成本困太死"
            },
            {
              "value": "people",
              "label": "熟悉感和人与人的连接"
            }
          ]
        },
        {
          "id": "decision",
          "label": "这次你最卡的决定是什么",
          "type": "select",
          "options": [
            {
              "value": "move-city",
              "label": "要不要换城市"
            },
            {
              "value": "alone-share",
              "label": "独居还是合租"
            },
            {
              "value": "rest-away",
              "label": "是不是该离开一阵"
            },
            {
              "value": "stay",
              "label": "要不要先继续待着观察"
            },
            {
              "value": "where-fit",
              "label": "搞清楚自己到底适合哪种城市"
            }
          ]
        },
        {
          "id": "story",
          "label": "最近最让你想逃开的生活片段",
          "type": "textarea",
          "placeholder": "写下最近某个瞬间：你为什么忽然很想离开，或者为什么开始怀疑这里不适合你。"
        },
        {
          "id": "wish",
          "label": "如果生活能重新顺一点，你最想先变好的是什么",
          "type": "textarea",
          "placeholder": "比如：想更好睡、想少通勤、想有空间感、想没那么孤单。"
        }
      ]
    },
    {
      "slug": "money-01",
      "title": "为什么我总是花钱失控",
      "subtitle": "把消费冲动和真实情绪触发点说清楚。",
      "category": "金钱与消费",
      "collection": "财务决策",
      "consultFocus": "从金钱压力、消费触发和长期安全感判断更适合的财务动作",
      "formIntro": "这组页面不是讲大道理，而是帮你把钱、情绪、现实安全感这几件事分开看。",
      "responseIntro": "Gemini 会结合你的当前状态，给出更像咨询式财务梳理的回复，而不是只叫你克制。",
      "followupPlaceholder": "继续追问，例如：如果我只能先调整一个花钱习惯，最值得先改哪一个？",
      "followupSuggestions": [
        "如果我现在只能先改一个财务动作，最值的是哪一个？",
        "我怎么判断这笔钱是在买需求，还是在买情绪？"
      ],
      "quickPrompts": [
        "我不是不知道要省，但状态一差就会控制不住地花。",
        "我总在存钱和想让自己过得像个人之间摇摆。",
        "我现在不是完全没钱，但心里一直没有底。"
      ],
      "palette": {
        "accent": "#2f9b6a",
        "accentSoft": "rgba(47, 155, 106, 0.16)",
        "accentStrong": "#166547",
        "glow": "rgba(47, 155, 106, 0.28)"
      },
      "fields": [
        {
          "id": "money_state",
          "label": "你现在最主要的财务困扰",
          "type": "select",
          "options": [
            {
              "value": "overspend",
              "label": "花钱控制不住"
            },
            {
              "value": "house",
              "label": "买房还是继续租"
            },
            {
              "value": "save-vs-live",
              "label": "先存钱还是先享受"
            },
            {
              "value": "big-cost",
              "label": "一笔钱值不值得花"
            },
            {
              "value": "reset",
              "label": "整个财务状态都想重启"
            }
          ]
        },
        {
          "id": "pressure_source",
          "label": "你的压力更像来自哪里",
          "type": "select",
          "options": [
            {
              "value": "future",
              "label": "怕以后没有安全感"
            },
            {
              "value": "present",
              "label": "现在就觉得过得太憋"
            },
            {
              "value": "compare",
              "label": "看到别人进度容易焦虑"
            },
            {
              "value": "emotion",
              "label": "情绪一差就容易花钱/乱判断"
            },
            {
              "value": "family",
              "label": "家庭期待或现实责任很重"
            }
          ]
        },
        {
          "id": "spending_pattern",
          "label": "你平时花钱更像哪种模式",
          "type": "select",
          "options": [
            {
              "value": "planned",
              "label": "大多有计划，只是某些节点会乱"
            },
            {
              "value": "emotion",
              "label": "很吃情绪，心情差容易失控"
            },
            {
              "value": "reward",
              "label": "会用消费奖励自己"
            },
            {
              "value": "practical",
              "label": "基本务实，但总担心花错"
            },
            {
              "value": "avoid",
              "label": "不太敢花，但也不敢真的面对账目"
            }
          ]
        },
        {
          "id": "main_need",
          "label": "这次你最想得到哪类帮助",
          "type": "select",
          "options": [
            {
              "value": "clarity",
              "label": "先判断这件事值不值得"
            },
            {
              "value": "boundary",
              "label": "想建立更稳的花钱边界"
            },
            {
              "value": "priority",
              "label": "想知道先处理哪一个财务动作"
            },
            {
              "value": "habit",
              "label": "想修一下自己的消费习惯"
            },
            {
              "value": "relief",
              "label": "想先把心里的财务焦虑理顺一点"
            }
          ]
        },
        {
          "id": "story",
          "label": "把最近最典型的一次财务困扰写下来",
          "type": "textarea",
          "placeholder": "比如一次冲动消费、一笔大开销犹豫、或者一想到房租和未来就很慌。"
        },
        {
          "id": "wish",
          "label": "如果一个月后财务状态顺一点，你希望最明显变好什么",
          "type": "textarea",
          "placeholder": "比如：不乱买、心里更有底、能做出一个不后悔的决定。"
        }
      ]
    },
    {
      "slug": "money-02",
      "title": "我该买房还是继续租",
      "subtitle": "适合卡在安全感、现金流和生活质量之间的人。",
      "category": "金钱与消费",
      "collection": "财务决策",
      "consultFocus": "从金钱压力、消费触发和长期安全感判断更适合的财务动作",
      "formIntro": "这组页面不是讲大道理，而是帮你把钱、情绪、现实安全感这几件事分开看。",
      "responseIntro": "Gemini 会结合你的当前状态，给出更像咨询式财务梳理的回复，而不是只叫你克制。",
      "followupPlaceholder": "继续追问，例如：如果我只能先调整一个花钱习惯，最值得先改哪一个？",
      "followupSuggestions": [
        "如果我现在只能先改一个财务动作，最值的是哪一个？",
        "我怎么判断这笔钱是在买需求，还是在买情绪？"
      ],
      "quickPrompts": [
        "我不是不知道要省，但状态一差就会控制不住地花。",
        "我总在存钱和想让自己过得像个人之间摇摆。",
        "我现在不是完全没钱，但心里一直没有底。"
      ],
      "palette": {
        "accent": "#2f9b6a",
        "accentSoft": "rgba(47, 155, 106, 0.16)",
        "accentStrong": "#166547",
        "glow": "rgba(47, 155, 106, 0.28)"
      },
      "fields": [
        {
          "id": "money_state",
          "label": "你现在最主要的财务困扰",
          "type": "select",
          "options": [
            {
              "value": "overspend",
              "label": "花钱控制不住"
            },
            {
              "value": "house",
              "label": "买房还是继续租"
            },
            {
              "value": "save-vs-live",
              "label": "先存钱还是先享受"
            },
            {
              "value": "big-cost",
              "label": "一笔钱值不值得花"
            },
            {
              "value": "reset",
              "label": "整个财务状态都想重启"
            }
          ]
        },
        {
          "id": "pressure_source",
          "label": "你的压力更像来自哪里",
          "type": "select",
          "options": [
            {
              "value": "future",
              "label": "怕以后没有安全感"
            },
            {
              "value": "present",
              "label": "现在就觉得过得太憋"
            },
            {
              "value": "compare",
              "label": "看到别人进度容易焦虑"
            },
            {
              "value": "emotion",
              "label": "情绪一差就容易花钱/乱判断"
            },
            {
              "value": "family",
              "label": "家庭期待或现实责任很重"
            }
          ]
        },
        {
          "id": "spending_pattern",
          "label": "你平时花钱更像哪种模式",
          "type": "select",
          "options": [
            {
              "value": "planned",
              "label": "大多有计划，只是某些节点会乱"
            },
            {
              "value": "emotion",
              "label": "很吃情绪，心情差容易失控"
            },
            {
              "value": "reward",
              "label": "会用消费奖励自己"
            },
            {
              "value": "practical",
              "label": "基本务实，但总担心花错"
            },
            {
              "value": "avoid",
              "label": "不太敢花，但也不敢真的面对账目"
            }
          ]
        },
        {
          "id": "main_need",
          "label": "这次你最想得到哪类帮助",
          "type": "select",
          "options": [
            {
              "value": "clarity",
              "label": "先判断这件事值不值得"
            },
            {
              "value": "boundary",
              "label": "想建立更稳的花钱边界"
            },
            {
              "value": "priority",
              "label": "想知道先处理哪一个财务动作"
            },
            {
              "value": "habit",
              "label": "想修一下自己的消费习惯"
            },
            {
              "value": "relief",
              "label": "想先把心里的财务焦虑理顺一点"
            }
          ]
        },
        {
          "id": "story",
          "label": "把最近最典型的一次财务困扰写下来",
          "type": "textarea",
          "placeholder": "比如一次冲动消费、一笔大开销犹豫、或者一想到房租和未来就很慌。"
        },
        {
          "id": "wish",
          "label": "如果一个月后财务状态顺一点，你希望最明显变好什么",
          "type": "textarea",
          "placeholder": "比如：不乱买、心里更有底、能做出一个不后悔的决定。"
        }
      ]
    },
    {
      "slug": "money-03",
      "title": "我该先存钱还是先享受生活",
      "subtitle": "不是二选一，而是看你眼下最缺什么。",
      "category": "金钱与消费",
      "collection": "财务决策",
      "consultFocus": "从金钱压力、消费触发和长期安全感判断更适合的财务动作",
      "formIntro": "这组页面不是讲大道理，而是帮你把钱、情绪、现实安全感这几件事分开看。",
      "responseIntro": "Gemini 会结合你的当前状态，给出更像咨询式财务梳理的回复，而不是只叫你克制。",
      "followupPlaceholder": "继续追问，例如：如果我只能先调整一个花钱习惯，最值得先改哪一个？",
      "followupSuggestions": [
        "如果我现在只能先改一个财务动作，最值的是哪一个？",
        "我怎么判断这笔钱是在买需求，还是在买情绪？"
      ],
      "quickPrompts": [
        "我不是不知道要省，但状态一差就会控制不住地花。",
        "我总在存钱和想让自己过得像个人之间摇摆。",
        "我现在不是完全没钱，但心里一直没有底。"
      ],
      "palette": {
        "accent": "#2f9b6a",
        "accentSoft": "rgba(47, 155, 106, 0.16)",
        "accentStrong": "#166547",
        "glow": "rgba(47, 155, 106, 0.28)"
      },
      "fields": [
        {
          "id": "money_state",
          "label": "你现在最主要的财务困扰",
          "type": "select",
          "options": [
            {
              "value": "overspend",
              "label": "花钱控制不住"
            },
            {
              "value": "house",
              "label": "买房还是继续租"
            },
            {
              "value": "save-vs-live",
              "label": "先存钱还是先享受"
            },
            {
              "value": "big-cost",
              "label": "一笔钱值不值得花"
            },
            {
              "value": "reset",
              "label": "整个财务状态都想重启"
            }
          ]
        },
        {
          "id": "pressure_source",
          "label": "你的压力更像来自哪里",
          "type": "select",
          "options": [
            {
              "value": "future",
              "label": "怕以后没有安全感"
            },
            {
              "value": "present",
              "label": "现在就觉得过得太憋"
            },
            {
              "value": "compare",
              "label": "看到别人进度容易焦虑"
            },
            {
              "value": "emotion",
              "label": "情绪一差就容易花钱/乱判断"
            },
            {
              "value": "family",
              "label": "家庭期待或现实责任很重"
            }
          ]
        },
        {
          "id": "spending_pattern",
          "label": "你平时花钱更像哪种模式",
          "type": "select",
          "options": [
            {
              "value": "planned",
              "label": "大多有计划，只是某些节点会乱"
            },
            {
              "value": "emotion",
              "label": "很吃情绪，心情差容易失控"
            },
            {
              "value": "reward",
              "label": "会用消费奖励自己"
            },
            {
              "value": "practical",
              "label": "基本务实，但总担心花错"
            },
            {
              "value": "avoid",
              "label": "不太敢花，但也不敢真的面对账目"
            }
          ]
        },
        {
          "id": "main_need",
          "label": "这次你最想得到哪类帮助",
          "type": "select",
          "options": [
            {
              "value": "clarity",
              "label": "先判断这件事值不值得"
            },
            {
              "value": "boundary",
              "label": "想建立更稳的花钱边界"
            },
            {
              "value": "priority",
              "label": "想知道先处理哪一个财务动作"
            },
            {
              "value": "habit",
              "label": "想修一下自己的消费习惯"
            },
            {
              "value": "relief",
              "label": "想先把心里的财务焦虑理顺一点"
            }
          ]
        },
        {
          "id": "story",
          "label": "把最近最典型的一次财务困扰写下来",
          "type": "textarea",
          "placeholder": "比如一次冲动消费、一笔大开销犹豫、或者一想到房租和未来就很慌。"
        },
        {
          "id": "wish",
          "label": "如果一个月后财务状态顺一点，你希望最明显变好什么",
          "type": "textarea",
          "placeholder": "比如：不乱买、心里更有底、能做出一个不后悔的决定。"
        }
      ]
    },
    {
      "slug": "money-04",
      "title": "这笔钱到底值不值得花",
      "subtitle": "帮你分辨需求、冲动、补偿和长期价值。",
      "category": "金钱与消费",
      "collection": "财务决策",
      "consultFocus": "从金钱压力、消费触发和长期安全感判断更适合的财务动作",
      "formIntro": "这组页面不是讲大道理，而是帮你把钱、情绪、现实安全感这几件事分开看。",
      "responseIntro": "Gemini 会结合你的当前状态，给出更像咨询式财务梳理的回复，而不是只叫你克制。",
      "followupPlaceholder": "继续追问，例如：如果我只能先调整一个花钱习惯，最值得先改哪一个？",
      "followupSuggestions": [
        "如果我现在只能先改一个财务动作，最值的是哪一个？",
        "我怎么判断这笔钱是在买需求，还是在买情绪？"
      ],
      "quickPrompts": [
        "我不是不知道要省，但状态一差就会控制不住地花。",
        "我总在存钱和想让自己过得像个人之间摇摆。",
        "我现在不是完全没钱，但心里一直没有底。"
      ],
      "palette": {
        "accent": "#2f9b6a",
        "accentSoft": "rgba(47, 155, 106, 0.16)",
        "accentStrong": "#166547",
        "glow": "rgba(47, 155, 106, 0.28)"
      },
      "fields": [
        {
          "id": "money_state",
          "label": "你现在最主要的财务困扰",
          "type": "select",
          "options": [
            {
              "value": "overspend",
              "label": "花钱控制不住"
            },
            {
              "value": "house",
              "label": "买房还是继续租"
            },
            {
              "value": "save-vs-live",
              "label": "先存钱还是先享受"
            },
            {
              "value": "big-cost",
              "label": "一笔钱值不值得花"
            },
            {
              "value": "reset",
              "label": "整个财务状态都想重启"
            }
          ]
        },
        {
          "id": "pressure_source",
          "label": "你的压力更像来自哪里",
          "type": "select",
          "options": [
            {
              "value": "future",
              "label": "怕以后没有安全感"
            },
            {
              "value": "present",
              "label": "现在就觉得过得太憋"
            },
            {
              "value": "compare",
              "label": "看到别人进度容易焦虑"
            },
            {
              "value": "emotion",
              "label": "情绪一差就容易花钱/乱判断"
            },
            {
              "value": "family",
              "label": "家庭期待或现实责任很重"
            }
          ]
        },
        {
          "id": "spending_pattern",
          "label": "你平时花钱更像哪种模式",
          "type": "select",
          "options": [
            {
              "value": "planned",
              "label": "大多有计划，只是某些节点会乱"
            },
            {
              "value": "emotion",
              "label": "很吃情绪，心情差容易失控"
            },
            {
              "value": "reward",
              "label": "会用消费奖励自己"
            },
            {
              "value": "practical",
              "label": "基本务实，但总担心花错"
            },
            {
              "value": "avoid",
              "label": "不太敢花，但也不敢真的面对账目"
            }
          ]
        },
        {
          "id": "main_need",
          "label": "这次你最想得到哪类帮助",
          "type": "select",
          "options": [
            {
              "value": "clarity",
              "label": "先判断这件事值不值得"
            },
            {
              "value": "boundary",
              "label": "想建立更稳的花钱边界"
            },
            {
              "value": "priority",
              "label": "想知道先处理哪一个财务动作"
            },
            {
              "value": "habit",
              "label": "想修一下自己的消费习惯"
            },
            {
              "value": "relief",
              "label": "想先把心里的财务焦虑理顺一点"
            }
          ]
        },
        {
          "id": "story",
          "label": "把最近最典型的一次财务困扰写下来",
          "type": "textarea",
          "placeholder": "比如一次冲动消费、一笔大开销犹豫、或者一想到房租和未来就很慌。"
        },
        {
          "id": "wish",
          "label": "如果一个月后财务状态顺一点，你希望最明显变好什么",
          "type": "textarea",
          "placeholder": "比如：不乱买、心里更有底、能做出一个不后悔的决定。"
        }
      ]
    },
    {
      "slug": "money-05",
      "title": "我的财务状态该怎么重启",
      "subtitle": "适合觉得账目乱、心也乱、想重新拉直的人。",
      "category": "金钱与消费",
      "collection": "财务决策",
      "consultFocus": "从金钱压力、消费触发和长期安全感判断更适合的财务动作",
      "formIntro": "这组页面不是讲大道理，而是帮你把钱、情绪、现实安全感这几件事分开看。",
      "responseIntro": "Gemini 会结合你的当前状态，给出更像咨询式财务梳理的回复，而不是只叫你克制。",
      "followupPlaceholder": "继续追问，例如：如果我只能先调整一个花钱习惯，最值得先改哪一个？",
      "followupSuggestions": [
        "如果我现在只能先改一个财务动作，最值的是哪一个？",
        "我怎么判断这笔钱是在买需求，还是在买情绪？"
      ],
      "quickPrompts": [
        "我不是不知道要省，但状态一差就会控制不住地花。",
        "我总在存钱和想让自己过得像个人之间摇摆。",
        "我现在不是完全没钱，但心里一直没有底。"
      ],
      "palette": {
        "accent": "#2f9b6a",
        "accentSoft": "rgba(47, 155, 106, 0.16)",
        "accentStrong": "#166547",
        "glow": "rgba(47, 155, 106, 0.28)"
      },
      "fields": [
        {
          "id": "money_state",
          "label": "你现在最主要的财务困扰",
          "type": "select",
          "options": [
            {
              "value": "overspend",
              "label": "花钱控制不住"
            },
            {
              "value": "house",
              "label": "买房还是继续租"
            },
            {
              "value": "save-vs-live",
              "label": "先存钱还是先享受"
            },
            {
              "value": "big-cost",
              "label": "一笔钱值不值得花"
            },
            {
              "value": "reset",
              "label": "整个财务状态都想重启"
            }
          ]
        },
        {
          "id": "pressure_source",
          "label": "你的压力更像来自哪里",
          "type": "select",
          "options": [
            {
              "value": "future",
              "label": "怕以后没有安全感"
            },
            {
              "value": "present",
              "label": "现在就觉得过得太憋"
            },
            {
              "value": "compare",
              "label": "看到别人进度容易焦虑"
            },
            {
              "value": "emotion",
              "label": "情绪一差就容易花钱/乱判断"
            },
            {
              "value": "family",
              "label": "家庭期待或现实责任很重"
            }
          ]
        },
        {
          "id": "spending_pattern",
          "label": "你平时花钱更像哪种模式",
          "type": "select",
          "options": [
            {
              "value": "planned",
              "label": "大多有计划，只是某些节点会乱"
            },
            {
              "value": "emotion",
              "label": "很吃情绪，心情差容易失控"
            },
            {
              "value": "reward",
              "label": "会用消费奖励自己"
            },
            {
              "value": "practical",
              "label": "基本务实，但总担心花错"
            },
            {
              "value": "avoid",
              "label": "不太敢花，但也不敢真的面对账目"
            }
          ]
        },
        {
          "id": "main_need",
          "label": "这次你最想得到哪类帮助",
          "type": "select",
          "options": [
            {
              "value": "clarity",
              "label": "先判断这件事值不值得"
            },
            {
              "value": "boundary",
              "label": "想建立更稳的花钱边界"
            },
            {
              "value": "priority",
              "label": "想知道先处理哪一个财务动作"
            },
            {
              "value": "habit",
              "label": "想修一下自己的消费习惯"
            },
            {
              "value": "relief",
              "label": "想先把心里的财务焦虑理顺一点"
            }
          ]
        },
        {
          "id": "story",
          "label": "把最近最典型的一次财务困扰写下来",
          "type": "textarea",
          "placeholder": "比如一次冲动消费、一笔大开销犹豫、或者一想到房租和未来就很慌。"
        },
        {
          "id": "wish",
          "label": "如果一个月后财务状态顺一点，你希望最明显变好什么",
          "type": "textarea",
          "placeholder": "比如：不乱买、心里更有底、能做出一个不后悔的决定。"
        }
      ]
    }
  ]
};
