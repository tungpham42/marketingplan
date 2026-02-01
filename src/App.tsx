import React, { useState } from "react";
import {
  Layout,
  Form,
  InputNumber,
  Button,
  Card,
  Typography,
  Select,
  Row,
  Col,
  message,
  Input,
  Divider,
  Space,
  FloatButton,
} from "antd";
import {
  RocketTwoTone,
  PieChartTwoTone,
  FireOutlined,
  ThunderboltFilled,
  CheckCircleFilled,
  ArrowUpOutlined,
} from "@ant-design/icons";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import "./App.css"; // Ensure your CSS is imported

const { Header, Content } = Layout;
const { Title, Text } = Typography;

const MarketingPlanApp: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [plan, setPlan] = useState<string>("");
  const [form] = Form.useForm();

  // (Options data remains the same as your provided code...)
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 6 }, (_, i) => currentYear + i); // 2026 to 2031

  const timeframes = [
    "1 Month (Micro-Campaign)",
    "90-Day Sprint (Quarterly)",
    "6 Months (Semi-Annual)",
    "12 Months (Full Fiscal Year)",
    "Product Launch (6-8 Weeks)",
    "Seasonal (Holiday/Black Friday)",
    "Evergreen (Ongoing)",
    "Multi-Year Roadshow",
  ];

  const kpis = [
    "ROAS (Return on Ad Spend)",
    "CAC (Customer Acquisition Cost)",
    "MQLs (Marketing Qualified Leads)",
    "SQLs (Sales Qualified Leads)",
    "CPA (Cost Per Action)",
    "LTV (Customer Lifetime Value)",
    "Brand Sentiment Score",
    "Share of Voice (SOV)",
    "Organic Keyword Ranking",
    "Viral Coefficient (K-Factor)",
    "Churn Rate Reduction",
    "NPS (Net Promoter Score)",
    "Conversion Rate (CR)",
    "Store Footprint/Traffic",
    "App Installs",
    "Average Order Value (AOV)",
  ];

  const channels = [
    "Google Search (SEM)",
    "Meta Ads (FB/IG)",
    "LinkedIn Ads (B2B)",
    "TikTok Ads (Gen Z)",
    "YouTube Video Marketing",
    "SEO (Organic Content)",
    "Email Automation/CRMs",
    "Influencer/KOL Outreach",
    "Affiliate/Referral Programs",
    "Podcast Sponsorships",
    "Programmatic Display",
    "Reddit/Community Marketing",
    "Webinars & Virtual Events",
    "Physical Events/Trade Shows",
    "OOH (Billboards/Transit)",
    "SMS/WhatsApp Marketing",
    "Product-Led Growth (PLG)",
    "Public Relations (PR)",
  ];

  const budgetAllocations = [
    "70/20/10 Rule (Core / Growth / Experimental)",
    "Heavy Conversion (90% Sales / 10% Brand)",
    "Brand Equity (70% Awareness / 30% Sales)",
    "Digital First (100% Online Channels)",
    "Omnichannel (Balance of Physical & Digital)",
    "Aggressive Market Entry (High CAC Allowance)",
    "Profitability Focus (Low CAC / Organic Heavy)",
    "Community Focused (Heavy Influencer/Referral Spend)",
  ];

  const onFinish = async (values: any) => {
    setLoading(true);
    const prompt = `
      Act as a world-class CMO and Strategy Consultant. Create a ${values.year} Marketing Master Plan for "${values.brandName}".
      
      PARAMETERS:
      - Budget: $${values.budget}
      - Plan Duration: ${values.timeframe}
      - Success Metrics (KPIs): ${values.kpi.join(", ")}
      - Chosen Channels: ${values.channels.join(", ")}
      - Investment Philosophy: ${values.budgetPerChannel}

      Please generate a high-level strategic document in Markdown:
      1. Strategic Objectives (What are we winning?)
      2. Market & SWOT Analysis (Contextual landscape)
      3. Deep-Dive Channel Strategy (Tactical execution per channel)
      4. Content & Creative Pillars (Messaging and themes)
      5. Execution Timeline (Phased approach)
    `;

    try {
      const response = await axios.post(
        "https://groqprompt.netlify.app/api/ai",
        { prompt },
      );
      setPlan(response.data.result || response.data);
      message.success({
        content: "Strategy Crafted!",
        icon: <CheckCircleFilled style={{ color: "#52c41a" }} />,
      });
    } catch (error) {
      message.error("The engine stalled. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header className="strategy-header">
        <Space size="middle">
          <div
            style={{
              background: "#6366f1",
              padding: "8px",
              borderRadius: "12px",
              display: "flex",
            }}
          >
            <RocketTwoTone
              twoToneColor="#ffffff"
              style={{ fontSize: "24px" }}
            />
          </div>
          <Title
            level={3}
            style={{ margin: 0, fontWeight: 700, letterSpacing: "-0.5px" }}
          >
            Marketing Plan Generator
            <Text type="secondary" style={{ marginLeft: 6, fontWeight: 400 }}>
              AI
            </Text>
          </Title>
        </Space>
      </Header>

      <Content
        style={{ padding: "40px 10%", maxWidth: "1600px", margin: "0 auto" }}
      >
        <Row gutter={[40, 40]}>
          <Col xs={24} lg={10}>
            <div style={{ marginBottom: "24px" }}>
              <Title level={2} style={{ fontWeight: 700, marginBottom: "8px" }}>
                Let's build your roadmap.
              </Title>
              <Text type="secondary" style={{ fontSize: "16px" }}>
                Input your constraints, and our AI CMO will handle the rest.
              </Text>
            </div>

            <Card className="glass-card">
              <Form
                form={form}
                layout="vertical"
                onFinish={onFinish}
                initialValues={{ year: 2026, budget: 25000 }}
              >
                <Row gutter={16}>
                  <Col span={10}>
                    <Form.Item label="Target Year" name="year">
                      <Select
                        size="large"
                        suffixIcon={
                          <ThunderboltFilled style={{ color: "#fbbf24" }} />
                        }
                        options={years.map((y) => ({ label: y, value: y }))}
                      />
                    </Form.Item>
                  </Col>
                  <Col span={14}>
                    <Form.Item label="Total Budget" name="budget">
                      <InputNumber
                        size="large"
                        style={{ width: "100%" }}
                        formatter={(v) =>
                          `$ ${v}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                        }
                      />
                    </Form.Item>
                  </Col>
                </Row>

                <Form.Item
                  label="Brand or Business Name"
                  name="brandName"
                  rules={[{ required: true }]}
                >
                  <Input
                    size="large"
                    placeholder="e.g. Nike, Local Cafe, SaaS..."
                  />
                </Form.Item>
                <Form.Item label="Timeframe" name="timeframe">
                  <Select
                    size="large"
                    options={timeframes.map((t) => ({ label: t, value: t }))}
                  />
                </Form.Item>
                <Form.Item label="Key Performance Indicators (KPIs)" name="kpi">
                  <Select
                    mode="multiple"
                    size="large"
                    placeholder="What are we measuring?"
                    options={kpis.map((k) => ({ label: k, value: k }))}
                  />
                </Form.Item>
                <Form.Item label="Marketing Channels" name="channels">
                  <Select
                    mode="multiple"
                    size="large"
                    placeholder="Where will we be?"
                    options={channels.map((c) => ({ label: c, value: c }))}
                  />
                </Form.Item>
                <Form.Item
                  label="Budget Allocation Philosophy"
                  name="budgetPerChannel"
                >
                  <Select
                    size="large"
                    options={budgetAllocations.map((s) => ({
                      label: s,
                      value: s,
                    }))}
                  />
                </Form.Item>

                <Divider style={{ margin: "12px 0 24px" }} />

                <Button
                  type="primary"
                  htmlType="submit"
                  block
                  className="generate-btn"
                  loading={loading}
                  icon={loading ? null : <FireOutlined />}
                >
                  {loading ? "Synthesizing Data..." : "Generate Master Plan"}
                </Button>
              </Form>
            </Card>
          </Col>

          <Col xs={24} lg={14}>
            <Card
              className="glass-card"
              style={{ minHeight: "800px", padding: "20px" }}
            >
              {plan ? (
                <div className="markdown-body">
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    rehypePlugins={[rehypeRaw]}
                  >
                    {plan}
                  </ReactMarkdown>
                </div>
              ) : (
                <div style={{ textAlign: "center", paddingTop: "200px" }}>
                  <PieChartTwoTone
                    twoToneColor="#e2e8f0"
                    style={{ fontSize: "80px" }}
                  />
                  <Title
                    level={4}
                    style={{
                      color: "#94a3b8",
                      marginTop: "24px",
                      fontWeight: 500,
                    }}
                  >
                    Your strategy will appear here
                  </Title>
                  <Text type="secondary">
                    Waiting for your brilliant inputs...
                  </Text>
                </div>
              )}
            </Card>
          </Col>
        </Row>
      </Content>
      <FloatButton.BackTop
        type="primary"
        icon={<ArrowUpOutlined />}
        style={{ right: 40, bottom: 40 }}
        visibilityHeight={300}
        tooltip="Lên đầu trang"
      />
    </Layout>
  );
};

export default MarketingPlanApp;
