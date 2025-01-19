import o from "axios";
class r extends Error {
  constructor(e, t, s, a) {
    super(e), this.name = "FAQError", this.code = t, this.status = s, this.details = a, Object.setPrototypeOf(this, r.prototype);
  }
}
class g {
  constructor(e) {
    this.config = e, this.client = o.create({
      baseURL: this.config.baseUrl || "https://api.thefaq.app/v1",
      headers: {
        Authorization: `Bearer ${e.apiKey}`,
        "X-Project-ID": e.projectId,
        "Content-Type": "application/json"
      }
    }), this.client.interceptors.response.use(
      (t) => t,
      (t) => {
        var s, a, i, n, c;
        throw new r(
          t.message || "An error occurred",
          ((a = (s = t.response) == null ? void 0 : s.data) == null ? void 0 : a.code) || "UNKNOWN_ERROR",
          ((i = t.response) == null ? void 0 : i.status) || 500,
          (c = (n = t.response) == null ? void 0 : n.data) == null ? void 0 : c.details
        );
      }
    );
  }
  // Category methods
  async getCategories(e) {
    const { data: t } = await this.client.get("/categories", { params: e });
    return t;
  }
  async getCategory(e) {
    const { data: t } = await this.client.get(`/categories/${e}`);
    return t;
  }
  // FAQ methods
  async getFAQs(e) {
    const { data: t } = await this.client.get("/faqs", { params: e });
    return t;
  }
  async getFAQ(e) {
    const { data: t } = await this.client.get(`/faqs/${e}`);
    return t;
  }
  async getFAQsByCategory(e, t) {
    const { data: s } = await this.client.get(`/categories/${e}/faqs`, {
      params: t
    });
    return s;
  }
  // Search method
  async searchFAQs(e, t) {
    const { data: s } = await this.client.get("/faqs/search", {
      params: { q: e, ...t }
    });
    return s;
  }
}
export {
  g as FAQClient,
  r as FAQError,
  g as default
};
//# sourceMappingURL=index.es.js.map
