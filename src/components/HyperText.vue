<template>
  <span class="kv-value">
    {{ displayText }}
  </span>
</template>

<script setup>
import {
  ref,
  computed,
  onMounted,
  watch,
  defineProps,
  defineEmits,
  onUnmounted,
} from "vue";

const props = defineProps({
  text: {
    type: String,
    default: "Hello World",
  },
  typingSpeed: {
    type: Number,
    default: 100,
  },
  randomText: {
    type: String,
    default: "abcdefghijklmnopqrstuvwxyz0123456789",
  },
  randomRefreshSpeed: {
    type: Number,
    default: 50,
  },
  // 新增IP查询动画相关参数
  status: {
    type: String,
    default: "idle", // 'idle' | 'loading' | 'result'
    validator: (value) => ["idle", "loading", "result"].includes(value),
  },
  loadingRefreshSpeed: {
    type: Number,
    default: 30,
  },
  deleteSpeed: {
    type: Number,
    default: 50,
  },
});

const emit = defineEmits(["decode-completed"]);

const displayText = ref("");
const typingIndex = ref(0);
const revealIndex = ref(-1);
const currentStatus = ref("idle"); // 内部状态管理
const deletingIndex = ref(-1); // 删除进度索引

let typingTimer = null;
let randomizeTimer = null;
let loadingTimer = null;
let deleteTimer = null;

// 计算原始文本的字符数
const textLength = computed(() => props.text.length);
// 计算1/3阈值
const oneThirdLength = computed(() => Math.floor(textLength.value / 3));

// 获取随机字符
const getRandomChar = () => {
  const randomIndex = Math.floor(Math.random() * props.randomText.length);
  return props.randomText[randomIndex];
};

// 生成当前应该显示的文本
const generateCurrentText = () => {
  let result = "";

  for (let i = 0; i < typingIndex.value; i++) {
    if (i <= revealIndex.value) {
      // 已经确定显示原始字符
      result += props.text[i];
    } else {
      // 显示随机字符
      result += getRandomChar();
    }
  }

  return result;
};

// 随机化当前显示文本中的字符，保留已显示的原始字符
const randomizeDisplayText = () => {
  displayText.value = generateCurrentText();
};

// 设置随机化定时器
const startRandomizing = () => {
  stopRandomizing();
  randomizeTimer = setInterval(randomizeDisplayText, props.randomRefreshSpeed);
};

// 停止随机化
const stopRandomizing = () => {
  if (randomizeTimer) {
    clearInterval(randomizeTimer);
    randomizeTimer = null;
  }
};

// 停止所有定时器
const stopAllTimers = () => {
  if (typingTimer) {
    clearTimeout(typingTimer);
    typingTimer = null;
  }
  if (loadingTimer) {
    clearInterval(loadingTimer);
    loadingTimer = null;
  }
  if (deleteTimer) {
    clearTimeout(deleteTimer);
    deleteTimer = null;
  }
  stopRandomizing();
};

// Loading状态：保持原文本长度，全部随机字符
const startLoadingAnimation = () => {
  stopAllTimers();
  currentStatus.value = "loading";

  // 设置显示文本长度为目标文本长度
  const generateLoadingText = () => {
    let result = "";
    for (let i = 0; i < props.text.length; i++) {
      result += getRandomChar();
    }
    return result;
  };

  // 开始loading动画
  const updateLoadingText = () => {
    displayText.value = generateLoadingText();
  };

  updateLoadingText();
  loadingTimer = setInterval(updateLoadingText, props.loadingRefreshSpeed);
};

// 删除动画：从右到左逐字删除
const startDeleteAnimation = () => {
  stopAllTimers();
  currentStatus.value = "deleting";
  deletingIndex.value = props.text.length - 1;

  const deleteNextChar = () => {
    if (deletingIndex.value >= 0) {
      // 生成当前显示的文本（删除到当前位置）
      let result = "";
      for (let i = 0; i <= deletingIndex.value; i++) {
        result += getRandomChar();
      }
      displayText.value = result;
      deletingIndex.value--;

      deleteTimer = setTimeout(deleteNextChar, props.deleteSpeed);
    } else {
      // 删除完成，开始解密动画
      startDecodeAnimation();
    }
  };

  deleteNextChar();
};

// 解密动画：复用原有逻辑
const startDecodeAnimation = () => {
  stopAllTimers();
  currentStatus.value = "decoding";

  // 重置解密相关状态
  typingIndex.value = 0;
  revealIndex.value = -1;
  displayText.value = "";

  // 开始解密动画
  startRandomizing();
  typeText();
};

// 打字效果：增加字符
const typeText = () => {
  if (typingIndex.value < textLength.value) {
    typingIndex.value++;
    randomizeDisplayText();

    // 当打印到1/3长度时，开始显示原始字符
    if (typingIndex.value >= oneThirdLength.value && revealIndex.value === -1) {
      startRevealingOriginalText();
    }

    typingTimer = setTimeout(typeText, props.typingSpeed);
  }
};

// 开始显示原始字符
const startRevealingOriginalText = () => {
  revealIndex.value = 0;
  revealNextChar();
};

// 逐个显示原始字符
const revealNextChar = () => {
  if (revealIndex.value < textLength.value - 1) {
    setTimeout(() => {
      revealIndex.value++;
      randomizeDisplayText();
      revealNextChar();
    }, props.typingSpeed);
  } else {
    // 解密完成
    if (currentStatus.value === "decoding") {
      currentStatus.value = "completed";
      emit("decode-completed");
    }
  }
};

// 重新开始打字效果（仅用于原有的解密模式）
const restartTyping = () => {
  // 清除所有定时器
  stopAllTimers();

  // 重置状态
  typingIndex.value = 0;
  revealIndex.value = -1;
  displayText.value = "";
  currentStatus.value = "decoding";

  // 开始动画效果
  startRandomizing();
  typeText();
};

// 状态控制函数
const handleStatusChange = (newStatus) => {
  switch (newStatus) {
    case "idle":
      stopAllTimers();
      currentStatus.value = "idle";
      displayText.value = props.text;
      break;
    case "loading":
      startLoadingAnimation();
      break;
    case "result":
      startDeleteAnimation();
      break;
  }
};

// 监听状态变化
watch(
  () => props.status,
  (newStatus) => {
    handleStatusChange(newStatus);
  },
  { immediate: true }
);

// 监听参数变化时重新开始打字效果（仅在非动画状态下）
watch(
  () => props.text,
  () => {
    if (props.status === "idle") {
      displayText.value = props.text;
    }
  }
);
watch(
  () => props.typingSpeed,
  () => {
    if (currentStatus.value === "decoding") {
      restartTyping();
    }
  }
);
watch(
  () => props.randomText,
  () => {
    if (currentStatus.value === "decoding") {
      restartTyping();
    }
  }
);
watch(
  () => props.randomRefreshSpeed,
  () => {
    if (currentStatus.value === "decoding") {
      restartTyping();
    }
  }
);

// 组件挂载时初始化
onMounted(() => {
  handleStatusChange(props.status);
});

// 组件卸载时清理定时器
onUnmounted(() => {
  stopAllTimers();
});
</script>

<style scoped>
.kv-value {
  color: inherit;
}
</style>
