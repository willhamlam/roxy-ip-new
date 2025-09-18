// API基础URL
const API_BASE_URL = "http://47.238.180.193:8095";

/**
 * 搜索指定IP地址的信息
 * @param {string} ip - 要查询的IP地址
 * @returns {Promise<Object>} 返回IP信息数据
 */
export async function searchIP(ip) {
  const response = await fetch(`${API_BASE_URL}/api/search_ip`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ip }),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const result = await response.json();

  if (result.code === 0 && result.data) {
    return {
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
  } else {
    throw new Error(result.msg || "API返回未知错误");
  }
}

/**
 * 获取当前用户的IP信息
 * @returns {Promise<Object>} 返回当前用户的IP信息
 */
export async function getCurrentIP() {
  const response = await fetch(`${API_BASE_URL}/api/ip.json`);

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const result = await response.json();

  // 处理返回数据 - 支持两种格式
  if (result.ip) {
    // 直接返回数据对象（包含ip字段）
    return {
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
  } else if (result.code === 0 && result.data) {
    // 包装格式
    return {
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
  } else {
    console.warn("初始化接口返回数据格式异常:", result);
    throw new Error("获取IP信息失败");
  }
}