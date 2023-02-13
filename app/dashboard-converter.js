import { assignmentString, block, blockList, convertFromDefinition } from "./utils.js";

const DASHBOARD = {
  layout_type: (v) => assignmentString("layout_type", v),
  title: (v) => assignmentString("title", v),
  description: (v) => assignmentString("description", v),
  widgets: (v) => convertWidgets(v),
  id: (_) => "",
  is_read_only: (v) => assignmentString("is_read_only", v),
  notify_list: (v) => assignmentString("notify_list", v),
  reflow_type: (v) => assignmentString("reflow_type", v),
  template_variables: (v) => blockList(v, "template_variable", assignmentString),
  template_variable_presets: (v) =>
    blockList(v, "template_variable_preset", (k1, v1) =>
      convertFromDefinition(TEMPLATE_VARIABLE_PRESET, k1, v1)
    ),
  url: (v) => assignmentString("url", v),
};

const WIDGET = {
  id: (_) => "",
  definition: (v) => widgetDefintion(v),
  layout: (v) => block("widget_layout", v, assignmentString),
};

const TEMPLATE_VARIABLE_PRESET = {
  name: (v) => assignmentString("name", v),
  template_variables: (v) => blockList(v, "template_variable", assignmentString),
};

const WIDGET_DEFINTION = {
  alert_id: (v) => assignmentString("alert_id", v),
  autoscale: (v) => assignmentString("autoscale", v),
  background_color: (v) => assignmentString("background_color", v),
  check: (v) => assignmentString("check", v),
  color_by_groups: (v) => assignmentString("color_by_groups", v),
  color_preference: (v) => assignmentString("color_preference", v),
  color: (v) => assignmentString("color", v),
  columns: (v) => assignmentString("columns", v),
  content: (v) => assignmentString("content", v),
  count: (_) => "", // 2.23.0 deprecated, see docs for widget.manage_status_definition
  custom_links: (v) => blockList(v, "custom_link", assignmentString),
  custom_unit: (v) => assignmentString("custom_unit", v),
  display_format: (v) => assignmentString("display_format", v),
  display_format: (v) => assignmentString("display_format", v),
  env: (v) => assignmentString("env", v),
  event_size: (v) => assignmentString("event_size", v),
  event: (v) => block("event", v, assignmentString),
  filters: (v) => assignmentString("filters", v),
  font_size: (v) => assignmentString("font_size", v),
  global_time_target: (_) => "",
  group_by: (v) => assignmentString("group_by", v),
  group: (v) => assignmentString("group", v),
  grouping: (v) => assignmentString("grouping", v),
  has_padding: (_) => "", // 2.23.0 not described in docs, occurs in widget.note_definition json
  has_search_bar: (v) => assignmentString("has_search_bar", v),
  hide_zero_counts: (v) => assignmentString("hide_zero_counts", v),
  hide_total: (v) => assignmentString("hide_total", v),
  indexes: (v) => assignmentString("indexes", v),
  layout_type: (v) => assignmentString("layout_type", v),
  legend: (v) => block("legend", v, assignmentString),
  legend_columns: (v) => assignmentString("legend_columns", v),
  legend_layout: (v) => assignmentString("legend_layout", v),
  legend_size: (v) => assignmentString("legend_size", v),
  live_span: (v) => assignmentString("live_span", v),
  logset: (_) => "", // 2.23.0 deprecated, see docs for widget.log_stream_definition
  margin: (v) => assignmentString("margin", v),
  markers: (v) => blockList(v, "marker", assignmentString),
  message_display: (v) => assignmentString("message_display", v),
  no_group_hosts: (v) => assignmentString("no_group_hosts", v),
  no_metric_hosts: (v) => assignmentString("no_metric_hosts", v),
  node_type: (v) => assignmentString("node_type", v),
  precision: (v) => assignmentString("precision", v),
  query: (v) => assignmentString("query", v),
  requests: (v) => convertRequests(v),
  right_yaxis: (v) => block("right_yaxis", v, assignmentString),
  scope: (v) => assignmentString("scope", v),
  service: (v) => assignmentString("service", v),
  show_breakdown: (v) => assignmentString("show_breakdown", v),
  show_date_column: (v) => assignmentString("show_date_column", v),
  show_distribution: (v) => assignmentString("show_distribution", v),
  show_error_budget: (v) => assignmentString("show_error_budget", v),
  show_errors: (v) => assignmentString("show_errors", v),
  show_hits: (v) => assignmentString("show_hits", v),
  show_last_triggered: (v) => assignmentString("show_last_triggered", v),
  show_latency: (v) => assignmentString("show_latency", v),
  show_legend: (v) => assignmentString("show_legend", v),
  show_message_column: (v) => assignmentString("show_message_column", v),
  show_message_column: (v) => assignmentString("show_message_column", v),
  show_priority: (v) => assignmentString("show_priority", v),
  show_resource_list: (v) => assignmentString("show_resource_list", v),
  show_tick: (v) => assignmentString("show_tick", v),
  show_title: (v) => assignmentString("show_title", v),
  size_format: (v) => assignmentString("size_format", v),
  sizing: (v) => assignmentString("sizing", v),
  slo_id: (v) => assignmentString("slo_id", v),
  sort: (v) => convertSort(v),
  span_name: (v) => assignmentString("span_name", v),
  start: (_) => "", // 2.23.0 deprecated, see docs for widget.manage_status_definition
  style: (v) => block("style", v, assignmentString),
  summary_type: (v) => assignmentString("summary_type", v),
  tags_execution: (v) => assignmentString("tags_execution", v),
  tags: (v) => assignmentString("tags", v),
  text_align: (v) => assignmentString("text_align", v),
  text: (v) => assignmentString("text", v),
  tick_edge: (v) => assignmentString("tick_edge", v),
  tick_pos: (v) => assignmentString("tick_pos", v),
  timeseries_background: (v) => 
    block("timeseries_background", v, (k1, v1) => convertFromDefinition(TIMESERIES_BACKGROUND, k1, v1)),
  time_windows: (v) => assignmentString("time_windows", v),
  time: (v) => (!!v.live_span ? assignmentString("live_span", v.live_span) : ""),
  title_align: (v) => assignmentString("title_align", v),
  title_size: (v) => assignmentString("title_size", v),
  title: (v) => assignmentString("title", v),
  type: (_) => "",
  unit: (v) => assignmentString("unit", v),
  url: (v) => assignmentString("url", v),
  vertical_align: (v) => assignmentString("vertical_align", v), 
  view_mode: (v) => assignmentString("view_mode", v),
  view_type: (v) => assignmentString("view_type", v),
  viz_type: (v) => assignmentString("viz_type", v),
  widget_layout: (v) => block("widget_layout", v, assignmentString),
  widgets: (v) => convertWidgets(v),
  xaxis: (v) => block("xaxis", v, assignmentString),
  yaxis: (v) => block("yaxis", v, assignmentString),
};

const REQUEST = {
  aggregator: (v) => assignmentString("aggregator", v),
  alias: (v) => assignmentString("alias", v),
  apm_query: (v) => assignmentString("apm_query", v),
  apm_stats_query: (v) => assignmentString("apm_stats_query", v),
  cell_display_mode: (v) => assignmentString("cell_display_mode", v),
  change_type: (v) => assignmentString("change_type", v),
  compare_to: (v) => assignmentString("compare_to", v),
  conditional_formats: (v) => blockList(v, "conditional_formats", assignmentString),
  display_type: (v) => assignmentString("display_type", v),
  fill: (v) => block("fill", v, assignmentString),
  formulas: (list) => 
    blockList(list, "formula", (k, v) => convertFromDefinition(FORMULA, k, v)),
  increase_good: (v) => assignmentString("increase_good", v),
  limit: (v) => assignmentString("limit", v),
  log_query: (v) => 
    block("log_query", v, (k1, v1) => convertFromDefinition(LOG_QUERY, k1, v1)),
  metadata: (v) => blockList(v, "metadata", assignmentString),
  network_query: (v) => assignmentString("network_query", v),
  on_right_yaxis: (v) => assignmentString("on_right_yaxis", v),
  order_by: (v) => assignmentString("order_by", v),
  order_dir: (v) => assignmentString("order_dir", v),
  order: (v) => assignmentString("order", v),
  process_query: (v) => assignmentString("process_query", v),
  q: (v) => assignmentString("q", v),
  queries: (list) => 
    blockList(list, "query", (k, v) => convertFromDefinition(QUERY, k, v)),
  response_format: (v) => assignmentString("response_format", v),
  rum_query: (v) => assignmentString("rum_query", v),
  security_query: (v) => assignmentString("security_query", v),
  show_present: (v) => assignmentString("show_present", v),
  style: (v) => block("style", v, assignmentString),
};

const FORMULA = {
  formula: (v) => assignmentString("formula_expression", v),
  alias: (v) => assignmentString("alias", v),
  cell_display_mode: (v) => assignmentString("cell_display_mode", v),
  limit: (v) => block("limit", v, assignmentString),
};

const QUERY = {
  name: (v) => assignmentString("name", v),
  data_source: (v) => assignmentString("data_source", v),
  query: (v) => assignmentString("query", v),
  aggregator: (v) => assignmentString("aggregator", v),
};

const LOG_QUERY = {
  index: (v) => assignmentString("index", v),
  compute: (v) => block("compute_query", v, assignmentString),
  group_by: (v) =>
    blockList(v, "group_by", (k1, v1) => convertFromDefinition(GROUP_BY, k1, v1)),
  multi_compute: (v) => blockList(v, "multi_compute", assignmentString),
  search: (v) => assignmentString("search_query", v.query),
  search_query: (v) => assignmentString("search_query", v),
};

const GROUP_BY = {
  facet: (v) => assignmentString("facet", v),
  limit: (v) => assignmentString("limit", v),
  sort: (v) => block("sort_query", v, assignmentString),
  sort_query: (v) => block("sort_query", v, assignmentString),
};

const STYLE = {
  palette: (v) => assignmentString("type", v),
  line_type: (v) => assignmentString("line_type", v),
  line_width: (v) => assignmentString("line_width", v),
}

const TIMESERIES_BACKGROUND = {
  yaxis: (v) => block("yaxis", v, assignmentString),
  type: (v) => assignmentString("type", v),
}

function convertSort(v) {
  return typeof v === "string"
    ? assignmentString("sort", v)
    : block("sort", v, assignmentString);
}

function convertWidgets(value) {
  return blockList(value, "widget", (k1, v1) => convertFromDefinition(WIDGET, k1, v1));
}

function convertRequests(value) {
  if (Array.isArray(value)) {
    return blockList(value, "request", (k, v) => convertFromDefinition(REQUEST, k, v));
  }
  return block("request", value, (k, v) => convertFromDefinition(REQUEST, k, v));
}

function widgetDefintion(contents) {
  let definitionType = contents.type === "slo" ? "service_level_objective" : contents.type;
  return block(`${definitionType}_definition`, contents, (k, v) =>
    convertFromDefinition(WIDGET_DEFINTION, k, v)
  );
}

export function generateDashboardTerraformCode(resourceName, dashboardData) {
  let result = "";
  Object.entries(dashboardData).forEach(([k, v]) => {
    result += convertFromDefinition(DASHBOARD, k, v);
  });
  return `resource "datadog_dashboard" "${resourceName}" {${result}\n}`;
}
