// 导入图片资源
import diagram1 from '@/assets/diagram_1.svg'
import diagram2 from '@/assets/diagram_2.svg'
import diagram3 from '@/assets/diagram_3.svg'
import diagram4 from '@/assets/diagram_4.svg'

export const contentData = {
  introduction: {
    title: "What is an IP Address Lookup Tool?",
    paragraphs: [
      "An IP address lookup, also known as IP geolocation, finds the real-world geographic location and other associated details of a device using its public IP address, short for Internet Protocol address.",
      "Every device connected to the internet, from servers to your personal computer or smartphone, is assigned a unique IP address to communicate across the network.",
      "RoxyBrowser IP checker queries global geolocation databases to provide you with detailed information mapped to that specific digital address."
    ],
    diagram: diagram1
  },
  
  information: {
    title: "What Information Can You Get?",
    description: "An IP lookup provides a wealth of technical and geographical data. However, it's important to understand its limitations.",
    whatItReveals: {
      title: "An IP checker typically reveals:",
      items: [
        {
          title: "Geolocation",
          description: "Country, State/Region, City, Zip Code."
        },
        {
          title: "Network", 
          description: "ISP Name, Organization, ASN."
        },
        {
          title: "Technical",
          description: "Hostname, Time Zone."
        }
      ]
    },
    whatItCantReveal: {
      title: "What an IP checker can't reveal:",
      items: [
        {
          title: "Personal Identity",
          description: "Your name, home address, or phone number."
        },
        {
          title: "Precise Location",
          description: "The location is an approximation of the ISP's network hub, not a live GPS coordinate."
        },
        {
          title: "Private Browsing Data",
          description: "Your internet activity is not accessible."
        }
      ]
    },
    diagrams: {
      reveals: diagram2,
      cantReveal: diagram3
    }
  },
  
  howItWorks: {
    title: "How Does an IP Address Lookup Tool Work?",
    description: "The process is a fascinating example of digital forensics, relying on constantly updated databases:",
    steps: [
      {
        title: "IP Address Allocation",
        description: "Global authorities (like IANA) allocate blocks of IP addresses to Regional Internet Registries, which in turn distribute them to Internet Service Providers (ISPs) in specific countries or regions."
      },
      {
        title: "Database Mapping", 
        description: "ISPs assign these IPs to their customers. Geolocation database providers collect this public data, mapping IP ranges to specific ISPs and their service areas."
      },
      {
        title: "Querying the Data",
        description: "When you enter an IP address into our tool, we send a secure query to one of these databases. The tool cross-references the IP and returns the recorded information, such as the country, city, and ISP owner."
      }
    ],
    diagram: diagram4
  },
  
  useCases: {
    title: "Common Uses for IP Address Lookups",
    description: "IP lookups are essential tools across many industries for legitimate and practical purposes",
    cases: [
      {
        title: "Cybersecurity",
        description: "Analysts trace the origin of cyberattacks, block traffic from malicious sources, and strengthen firewalls.",
        width: "w-2/3",
        flex: "tablet:flex-2"
      },
      {
        title: "Fraud Detection",
        description: "Financial services and e-commerce platforms flag suspicious transactions by comparing the IP location to the billing address on file.",
        width: "",
        flex: "tablet:flex-1"
      },
      {
        title: "Digital Rights Management",
        description: "Streaming services like Netflix or Hulu use IP geolocation to enforce licensing agreements and show only content available in your region.",
        width: "",
        flex: "tablet:flex-1"
      },
      {
        title: "Content Personalization",
        description: "Websites serve you content in your language, show prices in your local currency, and display relevant local news or events.",
        width: "w-2/3",
        flex: "tablet:flex-2"
      }
    ]
  }
}