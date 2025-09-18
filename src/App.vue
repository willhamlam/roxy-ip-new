<script setup>
import { ref, onMounted, computed } from "vue";
import Globe from "./components/Globe.vue";
import HyperText from "./components/HyperText.vue";

// API基础URL
const API_BASE_URL = "http://47.238.180.193:8095";

// IP查询状态管理
const queryStatus = ref("idle"); // 'idle' | 'loading' | 'result' | 'error'

// HyperText 动画状态计算 - 将 error 状态映射为 idle
const animationStatus = computed(() => {
  return queryStatus.value === "error" ? "idle" : queryStatus.value;
});
const ipResult = ref({
  ip: "",
  country_short: "",
  country_long: "",
  region: "",
  city: "",
  timezone: "",
  latitude: "",
  longitude: "",
  zipcode: "",
});
const errorMessage = ref("");
const ipInput = ref("");

// IP地址验证
const ipv4Regex =
  /^(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}$/;
const ipv6Regex =
  /^((?:[0-9A-Fa-f]{1,4}:){7}(?:[0-9A-Fa-f]{1,4}|:)|(?:[0-9A-Fa-f]{1,4}:){1,7}:|(?:[0-9A-Fa-f]{1,4}:){1,6}:[0-9A-Fa-f]{1,4}|(?:[0-9A-Fa-f]{1,4}:){1,5}(?::[0-9A-Fa-f]{1,4}){1,2}|(?:[0-9A-Fa-f]{1,4}:){1,4}(?::[0-9A-Fa-f]{1,4}){1,3}|(?:[0-9A-Fa-f]{1,4}:){1,3}(?::[0-9A-Fa-f]{1,4}){1,4}|(?:[0-9A-Fa-f]{1,4}:){1,2}(?::[0-9A-Fa-f]{1,4}){1,5}|[0-9A-Fa-f]{1,4}:(?::[0-9A-Fa-f]{1,4}){1,6}|:(?::[0-9A-Fa-f]{1,4}){1,7}|:)(?:%.+)?$/;
const isValidIp = (value) => ipv4Regex.test(value) || ipv6Regex.test(value);

// 手动IP查询
const handleSearch = async () => {
  const inputValue = ipInput.value?.trim();
  if (!inputValue || !isValidIp(inputValue)) {
    alert("请输入有效的IP地址");
    return;
  }

  queryStatus.value = "loading";
  errorMessage.value = "";

  try {
    const response = await fetch(`${API_BASE_URL}/api/search_ip`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ip: inputValue }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();

    if (result.code === 0 && result.data) {
      // 成功获取数据
      ipResult.value = {
        ip: result.data.ip,
        country_short: result.data.country_short,
        country_long: result.data.country_long,
        region: result.data.region,
        city: result.data.city,
        timezone: result.data.timezone,
        latitude: result.data.latitude,
        longitude: result.data.longitude,
        zipcode: result.data.zipcode,
      };
      queryStatus.value = "result";
      
      // 在手机端搜索完成后自动平滑滚动到顶部
      setTimeout(() => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      }, 100);
    } else {
      // API返回错误
      throw new Error(result.msg || "API返回未知错误");
    }
  } catch (error) {
    console.error("IP查询失败:", error);
    errorMessage.value = error.message || "网络请求失败，请检查网络连接";
    queryStatus.value = "error";
  }
};

// 初始化函数 - 获取本地IP数据
const initializeLocalIP = async () => {
  queryStatus.value = "loading";

  try {
    const response = await fetch(`${API_BASE_URL}/api/ip.json`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();

    // 处理返回数据
    if (result.ip) {
      // 如果直接返回数据对象（包含ip字段）
      ipResult.value = {
        ip: result.ip,
        country_short: result.country_short,
        country_long: result.country_long,
        region: result.region,
        city: result.city,
        timezone: result.timezone,
        latitude: result.latitude,
        longitude: result.longitude,
        zipcode: result.zipcode,
      };
      queryStatus.value = "result";
    } else if (result.code === 0 && result.data) {
      // 如果返回包装格式
      ipResult.value = {
        ip: result.data.ip,
        country_short: result.data.country_short,
        country_long: result.data.country_long,
        region: result.data.region,
        city: result.data.city,
        timezone: result.data.timezone,
        latitude: result.data.latitude,
        longitude: result.data.longitude,
        zipcode: result.data.zipcode,
      };
      queryStatus.value = "result";
    } else {
      console.warn("初始化接口返回数据格式异常:", result);
      queryStatus.value = "idle";
    }
  } catch (error) {
    console.error("获取本地IP数据失败:", error);
    // 初始化失败时保持空状态，不显示错误信息
    queryStatus.value = "idle";
  }
};

// 页面挂载时初始化
onMounted(() => {
  initializeLocalIP();
});
</script>

<template>
  <div id="roxy-ip-checker">
    <header class="w-full fixed">
      <div
        class="header-container px-1 tablet:px-2 w-full desktop:w-80 laptop:w-72 tablet:w-64 mx-auto flex items-center justify-between py-1 z-10 relative"
      >
        <img
          src="@/assets/rxip_logo.svg"
          alt="Roxy IP Checker"
          class="w-12 tablet:w-auto"
        />
        <ul class="flex items-center gap-4 text-sm">
          <li>
            <a href="https://roxybrowser.com" target="_blank">Home</a>
          </li>
        </ul>
      </div>
      <!-- <div class="gradient-blur">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div> -->
    </header>
    <main>
      <section
        class="roxy-ip-hero min-h-[900px] pt-6 px-1 desktop:w-80 laptop:w-72 tablet:w-64 mx-auto tablet:pb-12 tablet:pt-8 tablet:h-[100vh] tablet:justify-between tablet:text-center flex flex-col items-center"
      >
        <div class="roxy-ip-title w-full flex flex-col tablet:px-0">
          <h1 class="text-2xl text-center tablet:text-[2rem] leading-[1.2]">
            IP Address Lookup:<br class="block tablet:hidden" />
            What Is My IP?
          </h1>
          <p
            class="text-base text-center leading-[1.5] text-neutral-600 mt-[0.5rem]"
          >
            Instantly find the location and details of any IP address.<br
              class="hidden tablet:block"
            />
            <strong>Your public IP is detected automatically below.</strong>
          </p>
        </div>
        <div class="w-full tablet:px-2 desktop:px-6 mt-2 tablet:mt-0">
          <div class="roxy-ip-data flex flex-col tablet:flex-row w-full">
            <div
              class="roxy-ip-address flex w-full desktop:flex-6 flex-col text-left justify-between"
            >
              <Globe class="tablet:block hidden" />
              <div class="relative z-2">
                <p
                  class="text-sm text-center data-label tablet:text-base tablet:text-left"
                >
                  You current IP Address:
                </p>
                <p
                  class="text-[1.875rem] text-center data-ip tablet:text-[2.5rem] tablet:text-left"
                >
                  <HyperText
                    :text="ipResult.ip || '0.0.0.0'"
                    :status="animationStatus"
                    :loading-refresh-speed="30"
                    :delete-speed="10"
                    :typing-speed="50"
                  />
                </p>
              </div>
              <div class="relative z-2">
                <p
                  class="data-location hidden tablet:block tablet:text-left tablet:text-base"
                >
                  <HyperText
                    :text="
                      ipResult.longitude && ipResult.latitude
                        ? `${ipResult.longitude}，${ipResult.latitude}`
                        : '0.0000，0.0000'
                    "
                    :status="animationStatus"
                    :loading-refresh-speed="30"
                    :delete-speed="10"
                    :typing-speed="40"
                  />
                </p>
              </div>
            </div>
            <div class="roxy-ip-info flex w-full desktop:flex-5">
              <ul class="text-sm tablet:text-base">
                <li class="gap-0 flex flex-col tablet:flex-row tablet:gap-0.5">
                  <span class="roxy-ip-info-label">Country:</span>
                  <span class="roxy-ip-info-value">
                    <HyperText
                      :text="ipResult.country_long || 'Unknown'"
                      :status="animationStatus"
                      :loading-refresh-speed="30"
                      :delete-speed="10"
                      :typing-speed="30"
                    />
                  </span>
                </li>
                <li class="gap-0 flex flex-col tablet:flex-row tablet:gap-0.5">
                  <span class="roxy-ip-info-label">Region:</span
                  ><span class="roxy-ip-info-value">
                    <HyperText
                      :text="ipResult.region || 'Unknown'"
                      :status="animationStatus"
                      :loading-refresh-speed="30"
                      :delete-speed="10"
                      :typing-speed="30"
                    />
                  </span>
                </li>
                <li class="gap-0 flex flex-col tablet:flex-row tablet:gap-0.5">
                  <span class="roxy-ip-info-label">City:</span
                  ><span class="roxy-ip-info-value">
                    <HyperText
                      :text="ipResult.city || 'Unknown'"
                      :status="animationStatus"
                      :loading-refresh-speed="30"
                      :delete-speed="10"
                      :typing-speed="30"
                    />
                  </span>
                </li>
                <li class="gap-0 flex flex-col tablet:flex-row tablet:gap-0.5">
                  <span class="roxy-ip-info-label">Timezone:</span
                  ><span class="roxy-ip-info-value">
                    <HyperText
                      :text="ipResult.timezone || 'Unknown'"
                      :status="animationStatus"
                      :loading-refresh-speed="30"
                      :delete-speed="10"
                      :typing-speed="30"
                    />
                  </span>
                </li>
                <li class="gap-0 flex flex-col tablet:flex-row tablet:gap-0.5">
                  <span class="roxy-ip-info-label">Latitude:</span
                  ><span class="roxy-ip-info-value">
                    <HyperText
                      :text="ipResult.latitude || '0.0000'"
                      :status="animationStatus"
                      :loading-refresh-speed="30"
                      :delete-speed="10"
                      :typing-speed="30"
                    />
                  </span>
                </li>
                <li class="gap-0 flex flex-col tablet:flex-row tablet:gap-0.5">
                  <span class="roxy-ip-info-label">Longitude:</span
                  ><span class="roxy-ip-info-value">
                    <HyperText
                      :text="ipResult.longitude || '0.0000'"
                      :status="animationStatus"
                      :loading-refresh-speed="30"
                      :delete-speed="10"
                      :typing-speed="30"
                    />
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div
          class="roxy-ip-form mt-1 tablet:mt-0 w-full flex flex-col gap-1 tablet:gap-2"
        >
          <p
            class="roxy-ip-form-description text-base w-full tablet:w-27.5 mx-auto text-center leading-[1.5]"
          >
            Enter any IP address in the box below to instantly view its
            location, network details, and more information.
          </p>
          <div
            class="roxy-ip-form-wrapper w-full tablet:w-30 flex justify-between tablet:mx-auto"
          >
            <input
              type="text"
              placeholder="Enter IP address"
              v-model="ipInput"
              @keydown.enter="handleSearch"
              :disabled="queryStatus === 'loading'"
            />
            <button
              @click="handleSearch"
              :disabled="queryStatus === 'loading' || !ipInput?.trim()"
            >
              <img src="@/assets/ic_magnify.svg" alt="Lookup" />
              {{ queryStatus === "loading" ? "查询中..." : "Look Up" }}
            </button>
          </div>
        </div>
      </section>
      <div class="mt-4 tablet:mt-0 px-1 tablet:px-0">
        <section
          class="roxy-ip-introductions mt-0 tablet:mt-[-7rem] p-1 phone:p-3 w-full desktop:w-80 laptop:w-72 tablet:w-64 mx-auto"
        >
          <article class="intro-1">
            <h2>What is an IP Address Lookup Tool?</h2>
            <div
              class="flex gap-1 my-2 tablet:my-5 items-center flex-col tablet:flex-row"
            >
              <div class="desktop:flex-1 laptop:flex-5 tablet:flex-5">
                <p>
                  An IP address lookup, also known as IP geolocation, finds the
                  real-world geographic location and other associated details of
                  a device using its public IP address, short for Internet
                  Protocol address.
                </p>
                <br />
                <p>
                  Every device connected to the internet, from servers to your
                  personal computer or smartphone, is assigned a unique IP
                  address to communicate across the network.
                </p>
                <br />
                <p>
                  RoxyBrowser IP checker queries global geolocation databases to
                  provide you with detailed information mapped to that specific
                  digital address.
                </p>
              </div>
              <div class="desktop:flex-1 laptop:flex-6 tablet:flex-6">
                <div class="roxy-ip-diagram">
                  <img src="@/assets/diagram_1.svg" alt="IP Address Lookup" />
                </div>
              </div>
            </div>
          </article>
          <div class="divider"></div>
          <section>
            <article class="pt-4 tablet:pt-10">
              <h2>What Information Can You Get?</h2>
              <p class="w-full tablet:w-1/2 mt-1">
                An IP lookup provides a wealth of technical and geographical
                data. However, it's important to understand its limitations.
              </p>
              <div
                class="flex gap-2 my-2 tablet:my-5 items-center flex-col tablet:flex-row"
              >
                <div class="w-full desktop:flex-1 laptop:flex-5 tablet:flex-5">
                  <p><strong>An IP checker typically reveals:</strong></p>
                  <ul>
                    <li>
                      <p>
                        <strong>Geolocation</strong>: Country, State/Region,
                        City, Zip Code.
                      </p>
                    </li>
                    <li>
                      <p>
                        <strong>Network</strong>: ISP Name, Organization, ASN.
                      </p>
                    </li>
                    <li>
                      <p><strong>Technical</strong>: Hostname, Time Zone.</p>
                    </li>
                  </ul>
                </div>
                <div class="desktop:flex-1 laptop:flex-6 tablet:flex-6">
                  <div class="roxy-ip-diagram">
                    <img src="@/assets/diagram_2.svg" alt="IP Address Lookup" />
                  </div>
                </div>
              </div>
              <div
                class="flex gap-2 my-2 tablet:my-5 items-center flex-col tablet:flex-row"
              >
                <div class="w-full desktop:flex-1 laptop:flex-5 tablet:flex-5">
                  <p><strong>What an IP checker can't reveal:</strong></p>
                  <ul>
                    <li>
                      <p>
                        <strong>Personal Identity</strong>: Your name, home
                        address, or phone number.
                      </p>
                    </li>
                    <li>
                      <p>
                        <strong>Precise Location</strong>: The location is an
                        approximation of the ISP's network hub, not a live GPS
                        coordinate.
                      </p>
                    </li>
                    <li>
                      <p>
                        <strong>Private Browsing Data</strong>: Your internet
                        activity is not accessible.
                      </p>
                    </li>
                  </ul>
                </div>
                <div class="desktop:flex-1 laptop:flex-6 tablet:flex-6">
                  <div class="roxy-ip-diagram">
                    <img src="@/assets/diagram_3.svg" alt="IP Address Lookup" />
                  </div>
                </div>
              </div>
            </article>
          </section>
          <div class="divider"></div>
          <section>
            <article class="pt-4 tablet:pt-10">
              <h2>How Does an IP Address Lookup Tool Work?</h2>
              <p class="w-full tablet:w-1/2 mt-1">
                The process is a fascinating example of digital forensics,
                relying on constantly updated databases:
              </p>
              <div
                class="flex gap-2 my-2 tablet:my-5 items-center flex-col tablet:flex-row"
              >
                <div class="w-full desktop:flex-1 laptop:flex-5 tablet:flex-5">
                  <ol>
                    <li>
                      <p>
                        IP Address Allocation: Global authorities (like IANA)
                        allocate blocks of IP addresses to Regional Internet
                        Registries, which in turn distribute them to Internet
                        Service Providers (ISPs) in specific countries or
                        regions.
                      </p>
                    </li>
                    <li>
                      <p>
                        Database Mapping: ISPs assign these IPs to their
                        customers. Geolocation database providers collect this
                        public data, mapping IP ranges to specific ISPs and
                        their service areas.
                      </p>
                    </li>
                    <li>
                      <p>
                        Querying the Data: When you enter an IP address into our
                        tool, we send a secure query to one of these databases.
                        The tool cross-references the IP and returns the
                        recorded information, such as the country, city, and ISP
                        owner.
                      </p>
                    </li>
                  </ol>
                </div>
                <div class="desktop:flex-1 laptop:flex-6 tablet:flex-6">
                  <div class="roxy-ip-diagram">
                    <img src="@/assets/diagram_4.svg" alt="IP Address Lookup" />
                  </div>
                </div>
              </div>
            </article>
          </section>
        </section>
      </div>
      <div class="px-1 tablet:px-0">
        <section
          class="roxy-ip-use p-1 phone:p-3 desktop:w-80 laptop:w-72 tablet:w-64 mx-auto"
        >
          <h2>Common Uses for IP Address Lookups</h2>
          <p class="mt-1">
            IP lookups are essential tools across many industries for legitimate
            and practical purposes
          </p>
          <div class="flex gap-2 my-2 flex-col tablet:flex-row">
            <div class="use-case tablet:flex-2">
              <p class="case-title">Cybersecurity</p>
              <p class="case-description w-2/3">
                Analysts trace the origin of cyberattacks, block traffic from
                malicious sources, and strengthen firewalls.
              </p>
            </div>
            <div class="use-case tablet:flex-1">
              <p class="case-title">Fraud Detection</p>
              <p class="case-description">
                Financial services and e-commerce platforms flag suspicious
                transactions by comparing the IP location to the billing address
                on file.
              </p>
            </div>
          </div>
          <div class="flex gap-2 flex-col tablet:flex-row">
            <div class="use-case tablet:flex-1">
              <p class="case-title">Digital Rights Management</p>
              <p class="case-description">
                Streaming services like Netflix or Hulu use IP geolocation to
                enforce licensing agreements and show only content available in
                your region.
              </p>
            </div>
            <div class="use-case tablet:flex-2">
              <p class="case-title">Content Personalization</p>
              <p class="case-description w-2/3">
                Websites serve you content in your language, show prices in your
                local currency, and display relevant local news or events.
              </p>
            </div>
          </div>
        </section>
      </div>
      <section class="roxy-ip-privacy"></section>
    </main>
  </div>
</template>

<style scoped>
#roxy-ip-checker {
  width: 100%;
}

header {
  z-index: 2;
}

.gradient-blur {
  height: 100%;
  pointer-events: none;
}
.gradient-blur > div,
.gradient-blur::before,
.gradient-blur::after {
  position: absolute;
  inset: 0;
}
.gradient-blur::before {
  content: "";
  z-index: 8;
  backdrop-filter: blur(64px);
  mask: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 1) 0%,
    rgba(0, 0, 0, 1) 12.5%,
    rgba(0, 0, 0, 0) 25%
  );
}
.gradient-blur > div:nth-of-type(1) {
  z-index: 7;
  backdrop-filter: blur(32px);
  mask: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 1) 0%,
    rgba(0, 0, 0, 1) 25%,
    rgba(0, 0, 0, 0) 37.5%
  );
}
.gradient-blur > div:nth-of-type(2) {
  z-index: 6;
  backdrop-filter: blur(16px);
  mask: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 1) 12.5%,
    rgba(0, 0, 0, 1) 37.5%,
    rgba(0, 0, 0, 0) 50%
  );
}
.gradient-blur > div:nth-of-type(3) {
  z-index: 5;
  backdrop-filter: blur(8px);
  mask: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 1) 25%,
    rgba(0, 0, 0, 1) 50%,
    rgba(0, 0, 0, 0) 62.5%
  );
}
.gradient-blur > div:nth-of-type(4) {
  z-index: 4;
  backdrop-filter: blur(4px);
  mask: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 1) 37.5%,
    rgba(0, 0, 0, 1) 62.5%,
    rgba(0, 0, 0, 0) 75%
  );
}
.gradient-blur > div:nth-of-type(5) {
  z-index: 3;
  backdrop-filter: blur(2px);
  mask: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 1) 50%,
    rgba(0, 0, 0, 1) 75%,
    rgba(0, 0, 0, 0) 87.5%
  );
}
.gradient-blur > div:nth-of-type(6) {
  z-index: 2;
  backdrop-filter: blur(1px);
  mask: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 1) 62.5%,
    rgba(0, 0, 0, 1) 87.5%,
    rgba(0, 0, 0, 0) 100%
  );
}
.gradient-blur::after {
  content: "";
  z-index: 1;
  backdrop-filter: blur(0.5px);
  mask: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 1) 75%,
    rgba(0, 0, 0, 1) 100%,
    rgba(0, 0, 0, 0) 100%
  );
}

main {
  width: 100%;
  position: relative;
  overflow: hidden;
  overflow-y: auto;
  section {
    position: relative;
    z-index: 1;
  }
}

.divider {
  width: 100%;
  border-top: 1px dashed #000;
  opacity: 0.2;
}

main::before {
  content: "";
  position: absolute;
  z-index: 0;
  top: 16rem;
  left: 50%;
  transform: translateX(-50%);
  width: 2000px;
  height: 2000px;
  background-image: url("@/assets/rxip_blob.svg");
  background-position: center;
  pointer-events: none;
}

.roxy-ip-hero {
  h1 {
    font-family: "Archivo";
    font-weight: 700;
  }

  .roxy-ip-data {
    background-color: #fff;
    border-radius: 24px;
    border: 1px solid #e5e5e5;
    padding: 0.5rem;
    overflow: hidden;

    .data-ip {
      font-family: "Geist Mono";
      font-weight: 500;
    }

    .roxy-ip-address {
      padding: 0.75rem 1.5rem;
      position: relative;

      .globe {
        position: absolute;
        left: -6rem;
        bottom: -1rem;
        opacity: 0.4;
      }
    }

    .roxy-ip-info {
      display: flex;
      flex-direction: column;
      gap: 0;
      background: #f1f6fe;
      padding: 0.75rem 1.5rem;
      border-radius: 1rem;
      ul {
        li {
          padding: 0.75rem 0rem;
          text-align: left;
          font-family: "Geist Mono";
          border-bottom: 1px dashed #e5e5e5;
          &:last-child {
            border-bottom: none;
          }
        }
        .roxy-ip-info-label {
          font-weight: 500;
          opacity: 0.6;
          flex: 3;
        }
        .roxy-ip-info-value {
          font-weight: 500;
          flex: 7;
        }
      }
    }

    .data-tag {
      font-size: 0.875rem;
      display: flex;
      padding: 0.5rem 1rem;
      justify-content: center;
      align-items: center;
      border-radius: 2rem;
      background: #f1f6fe;
    }

    .data-location {
      font-family: "Geist Mono";
    }
  }

  .roxy-ip-form {
    .roxy-ip-form-description {
      color: #fff;
    }
    .roxy-ip-form-wrapper {
      background: #fff;
      border-radius: 9px;
      padding: 2px;
      position: relative;

      input {
        font-family: "Geist Mono";
        letter-spacing: normal;
        padding: 0.5rem 1rem;
        width: 100%;
        &:focus {
          outline: none;
        }
        &:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }
      }

      button {
        cursor: pointer;
        position: absolute;
        right: 2px;
        top: 2px;
        display: inline-flex;
        padding: 0.5rem 1rem;
        align-items: center;
        gap: 0.75rem;
        border-radius: 8px;
        color: #fff;
        font-size: 1rem;
        border-radius: 8px;
        background: linear-gradient(105deg, #287bff 3.01%, #ffc6c6 110.56%);
        &:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }
      }
    }
  }
}

.roxy-ip-diagram {
  width: 100%;
}

.roxy-ip-use {
  margin-top: 3rem;

  .use-case {
    padding: 2rem;
    background: #f1f6fe;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    border-radius: 24px;
    height: 15rem;

    gap: 0.5rem;

    .case-title {
      font-size: 1.25rem;
      font-weight: 600;
      color: #000;
    }
  }
}

.roxy-ip-introductions,
.roxy-ip-use {
  border-radius: 24px;
  background: #fff;

  h2 {
    font-size: 1.25rem;
    line-height: 1.2;
    font-weight: 600;
  }

  ul {
    list-style: disc;
  }

  ol {
    list-style: decimal;
  }

  ul,
  ol {
    padding-left: 1rem;
    li {
      margin: 0.5rem 0;
    }
  }

  p {
    color: var(--Color-Text-text-secondary, #645d59);
    font-size: 16px;
    line-height: 1.6;
    strong {
      color: #000;
      font-weight: 600;
    }
  }
}
</style>
