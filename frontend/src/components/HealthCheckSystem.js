import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './HealthCheckSystem.css'; // 确保样式文件正确引入

function HealthCheckSystem() {
  const navigate = useNavigate();
  const [showReportMenu, setShowReportMenu] = useState(false);
  const [reportContent, setReportContent] = useState(null);
  const [selectedReport, setSelectedReport] = useState(null);
  const [pageTitle, setPageTitle] = useState('');

  const toggleReportMenu = () => {
    setShowReportMenu(!showReportMenu);
  };

  const showReport = (reportType) => {
    setSelectedReport(reportType);
    setReportContent(null);
    setShowReportMenu(false);
    if (reportType === 'bloodRoutine') {
      setPageTitle('血常规报告单');
    } else if (reportType === 'kidneyFunction') {
      setPageTitle('肾功能报告单');
    }
  };

  const showDetails = () => {
    let content;
    if (selectedReport === 'bloodRoutine') {
      content = (
        <div>
          <table className="report-table">
            <thead>
              <tr>
                <th>项目</th>
                <th>结果</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>白细胞计数</td><td>6.5 x 10^9/L</td></tr>
              <tr><td>红细胞计数</td><td>4.5 x 10^12/L</td></tr>
              <tr><td>血红蛋白</td><td>140 g/L</td></tr>
              <tr><td>血小板计数</td><td>250 x 10^9/L</td></tr>
            </tbody>
          </table>
        </div>
      );
    } else if (selectedReport === 'kidneyFunction') {
      content = (
        <div>
          <table className="report-table">
            <thead>
              <tr>
                <th>项目</th>
                <th>结果</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>肌酐</td><td>80 µmol/L</td></tr>
              <tr><td>尿素氮</td><td>5.0 mmol/L</td></tr>
              <tr><td>尿酸</td><td>300 µmol/L</td></tr>
            </tbody>
          </table>
        </div>
      );
    }
    setReportContent(content);
  };

  return (
    <div className="grid-container">
      <div className="header">
        <h2 className="title">健康体检管理系统</h2>
      </div>
      <div className="sidebar">
        <button className="nav-button" onClick={() => navigate('/appointment')}>
          预约体检
        </button>
        <button className="nav-button" onClick={toggleReportMenu}>
          查询体检报告
        </button>
        {showReportMenu && (
          <div className="dropdown-menu">
            <button className="nav-button" onClick={() => showReport('bloodRoutine')}>
              血常规报告单
            </button>
            <button className="nav-button" onClick={() => showReport('kidneyFunction')}>
              肾功能报告单
            </button>
          </div>
        )}
      </div>
      <div className="content">
        {pageTitle && <h3 className="report-title">{pageTitle}</h3>}
        {selectedReport && (
          <div className="user-info">
            <table className="info-table">
              <thead>
                <tr>
                  <th>用户名</th>
                  <th>姓名</th>
                  <th>年龄</th>
                  <th>性别</th>
                  <th>体检时间</th>
                  <th>体检地点</th>
                  <th>报告生成时间</th>
                  <th>操作</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>user123</td>
                  <td>张三</td>
                  <td>30</td>
                  <td>男</td>
                  <td>2024-10-17</td>
                  <td>北京市医院</td>
                  <td>2024-10-18</td>
                  <td><button onClick={showDetails}>查看详情</button></td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
        {reportContent || <p></p>}
      </div>
      <div className="footer">
        {/* 底部信息 */}
      </div>
    </div>
  );
}

export default HealthCheckSystem;
