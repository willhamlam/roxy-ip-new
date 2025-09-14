<script setup>
import HelloWorld from "./components/HelloWorld.vue";
import Globe from "./components/Globe.vue";
</script>

<template>
  <div id="roxy-ip-checker">
    <header class="w-full fixed">
      <div
        class="header-container w-full desktop:w-80 laptop:w-72 tablet:w-64 mx-auto flex items-center justify-between py-1"
      >
        <img src="@/assets/rxip_logo.svg" alt="Roxy IP Checker" />
        <ul class="flex items-center gap-4 text-sm">
          <li>
            <a href="#">Home</a>
          </li>
          <li>
            <a href="#">About</a>
          </li>
        </ul>
      </div>
    </header>
    <main>
      <section
        class="roxy-ip-hero desktop:w-80 laptop:w-72 tablet:w-64 mx-auto pb-12 pt-10 flex flex-col items-center justify-between"
      >
        <div class="roxy-ip-title flex flex-col gap-1">
          <h1>IP Address Lookup: What Is My IP?</h1>
          <p class="text-base leading-1.5 text-neutral-600">
            Instantly find the location and details of any IP address.<br />
            <strong>Your public IP is detected automatically below.</strong>
          </p>
        </div>
        <div class="w-full tablet:px-6">
          <div class="roxy-ip-data flex w-full">
            <div
              class="roxy-ip-address flex flex-6 flex-col text-left justify-between"
            >
              <Globe />
              <div class="relative z-2">
                <p class="data-label">You current IP Address:</p>
                <p class="data-ip">182.255.32.54</p>
              </div>
              <div class="relative z-2">
                <p class="data-location">-118.243 ，34.0549</p>
              </div>
            </div>
            <div class="roxy-ip-info flex flex-5 w-full">
              <ul>
                <li>
                  <span class="roxy-ip-info-label">Country:</span
                  ><span class="roxy-ip-info-value"
                    >United States of America</span
                  >
                </li>
                <li>
                  <span class="roxy-ip-info-label">Region:</span
                  ><span class="roxy-ip-info-value">California</span>
                </li>
                <li>
                  <span class="roxy-ip-info-label">City:</span
                  ><span class="roxy-ip-info-value">Los Angeles</span>
                </li>
                <li>
                  <span class="roxy-ip-info-label">Timezone:</span
                  ><span class="roxy-ip-info-value"
                    >Los Angeles County, CA (GMT-7)</span
                  >
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="roxy-ip-form flex flex-col gap-2">
          <p class="roxy-ip-form-description w-27.5 mx-auto">
            Enter any IP address in the box below to instantly view its
            location, network details, and more information.
          </p>
          <div class="roxy-ip-form-wrapper flex justify-between">
            <input type="text" placeholder="Enter IP address" />
            <button>
              <img src="@/assets/ic_magnify.svg" alt="Lookup" />
              Look Up
            </button>
          </div>
        </div>
      </section>
      <section
        class="roxy-ip-introductions w-full desktop:w-80 laptop:w-72 tablet:w-64 mx-auto"
      >
        <article class="intro-1">
          <h2>What is an IP Address Lookup Tool?</h2>
          <div class="flex gap-1 my-5 items-center">
            <div class="desktop:flex-1 laptop:flex-5 tablet:flex-5">
              <p>
                An IP address lookup, also known as IP geolocation, finds the
                real-world geographic location and other associated details of a
                device using its public IP address, short for Internet Protocol
                address.
              </p>
              <br />
              <p>
                Every device connected to the internet, from servers to your
                personal computer or smartphone, is assigned a unique IP address
                to communicate across the network.
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
          <article class="pt-10">
            <h2>What Information Can You Get?</h2>
            <p class="w-1/2 mt-1">
              An IP lookup provides a wealth of technical and geographical data.
              However, it's important to understand its limitations.
            </p>
            <div class="flex gap-2 mt-5 mb-5 items-center">
              <div class="desktop:flex-1 laptop:flex-5 tablet:flex-5">
                <p><strong>An IP checker typically reveals:</strong></p>
                <ul>
                  <li>
                    <p>
                      <strong>Geolocation</strong>: Country, State/Region, City,
                      Zip Code.
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
            <div class="flex gap-2 mt-5 mb-5 items-center">
              <div class="desktop:flex-1 laptop:flex-5 tablet:flex-5">
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
          <article class="pt-10">
            <h2>How Does an IP Address Lookup Tool Work?</h2>
            <p class="w-1/2 mt-1">
              The process is a fascinating example of digital forensics, relying
              on constantly updated databases:
            </p>
            <div class="flex gap-2 my-5 items-center">
              <div class="desktop:flex-1 laptop:flex-5 tablet:flex-5">
                <ol>
                  <li>
                    <p>
                      IP Address Allocation: Global authorities (like IANA)
                      allocate blocks of IP addresses to Regional Internet
                      Registries, which in turn distribute them to Internet
                      Service Providers (ISPs) in specific countries or regions.
                    </p>
                  </li>
                  <li>
                    <p>
                      Database Mapping: ISPs assign these IPs to their
                      customers. Geolocation database providers collect this
                      public data, mapping IP ranges to specific ISPs and their
                      service areas.
                    </p>
                  </li>
                  <li>
                    <p>
                      Querying the Data: When you enter an IP address into our
                      tool, we send a secure query to one of these databases.
                      The tool cross-references the IP and returns the recorded
                      information, such as the country, city, and ISP owner.
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
      <section class="roxy-ip-use desktop:w-80 laptop:w-72 tablet:w-64 mx-auto">
        <h2>Common Uses for IP Address Lookups</h2>
        <p class="mt-1">
          IP lookups are essential tools across many industries for legitimate
          and practical purposes
        </p>
        <div class="flex gap-2 my-2">
          <div class="use-case flex-2">
            <p class="case-title">Cybersecurity</p>
            <p class="case-description w-2/3">
              Analysts trace the origin of cyberattacks, block traffic from
              malicious sources, and strengthen firewalls.
            </p>
          </div>
          <div class="use-case flex-1">
            <p class="case-title">Fraud Detection</p>
            <p class="case-description">
              Financial services and e-commerce platforms flag suspicious
              transactions by comparing the IP location to the billing address
              on file.
            </p>
          </div>
        </div>
        <div class="flex gap-2">
          <div class="use-case flex-1">
            <p class="case-title">Digital Rights Management</p>
            <p class="case-description">
              Streaming services like Netflix or Hulu use IP geolocation to
              enforce licensing agreements and show only content available in
              your region.
            </p>
          </div>
          <div class="use-case flex-2">
            <p class="case-title">Content Personalization</p>
            <p class="case-description w-2/3">
              Websites serve you content in your language, show prices in your
              local currency, and display relevant local news or events.
            </p>
          </div>
        </div>
      </section>
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

main {
  width: 100%;
  position: relative;
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
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
  pointer-events: none;
}

.roxy-ip-hero {
  height: 100vh;
  text-align: center;

  h1 {
    font-size: 2rem;
    font-family: "Archivo";
    font-weight: 700;
  }

  .roxy-ip-data {
    background-color: #fff;
    border-radius: 24px;
    border: 1px solid #e5e5e5;
    padding: 0.5rem;
    overflow: hidden;

    .data-label {
      font-size: 1rem;
    }

    .data-ip {
      font-family: "Geist Mono";
      font-size: 2.5rem;
      font-weight: 500;
    }

    .roxy-ip-address {
      padding: 0.75rem 1.5rem;
      position: relative;

      .globe {
        position: absolute;
        left: -6rem;
        top: 3rem;
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
          display: flex;
          gap: 0.5rem;
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
        padding: 0.5rem 1rem;
        width: 100%;
        &:focus {
          outline: none;
        }
      }

      button {
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
      }
    }
  }
}

.roxy-ip-introductions {
  margin-top: -7rem;
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
  padding: 3rem 3rem;

  h2 {
    font-size: 1.5rem;
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
