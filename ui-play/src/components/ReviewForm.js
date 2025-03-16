import React, { useState } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';

const ReviewForm = ({ onSubmit, isLoading }) => {
  const [formData, setFormData] = useState({
    appId: '',
    count: 100,
    lang: 'en',
    country: 'us',
    fromDate: '',
    toDate: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="form-container">
      <h2>Fetch Google Play Reviews</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="appId">
          <Form.Label>App ID (Package Name)</Form.Label>
          <Form.Control
            type="text"
            name="appId"
            value={formData.appId}
            onChange={handleChange}
            placeholder="e.g., org.supertuxkart.stk"
            required
          />
          <Form.Text className="text-muted">
            The package name of the app on Google Play Store
          </Form.Text>
        </Form.Group>

        <Row className="mb-3">
          <Col md={4}>
            <Form.Group controlId="count">
              <Form.Label>Number of Reviews</Form.Label>
              <Form.Control
                type="number"
                name="count"
                value={formData.count}
                onChange={handleChange}
                min="1"
                max="1000"
              />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group controlId="lang">
              <Form.Label>Language</Form.Label>
              <Form.Control
                as="select"
                name="lang"
                value={formData.lang}
                onChange={handleChange}
              >
                <option value="en">English (en)</option>
                <option value="es">Spanish (es)</option>
                <option value="fr">French (fr)</option>
                <option value="de">German (de)</option>
                <option value="it">Italian (it)</option>
                <option value="pt">Portuguese (pt)</option>
                <option value="ru">Russian (ru)</option>
                <option value="ja">Japanese (ja)</option>
                <option value="ko">Korean (ko)</option>
                <option value="zh">Chinese (zh)</option>
              </Form.Control>
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group controlId="country">
              <Form.Label>Country</Form.Label>
              <Form.Control
                as="select"
                name="country"
                value={formData.country}
                onChange={handleChange}
              >
                <option value="us">United States (us)</option>
                <option value="gb">United Kingdom (gb)</option>
                <option value="ca">Canada (ca)</option>
                <option value="au">Australia (au)</option>
                <option value="fr">France (fr)</option>
                <option value="de">Germany (de)</option>
                <option value="jp">Japan (jp)</option>
                <option value="kr">South Korea (kr)</option>
                <option value="br">Brazil (br)</option>
                <option value="in">India (in)</option>
                <option value="ru">Russia (ru)</option>
                <option value="es">Spain (es)</option>
                <option value="mx">Mexico (mx)</option>
                <option value="it">Italy (it)</option>
              </Form.Control>
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col md={6}>
            <Form.Group controlId="fromDate">
              <Form.Label>From Date (Optional)</Form.Label>
              <Form.Control
                type="date"
                name="fromDate"
                value={formData.fromDate}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="toDate">
              <Form.Label>To Date (Optional)</Form.Label>
              <Form.Control
                type="date"
                name="toDate"
                value={formData.toDate}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
        </Row>

        <Button 
          variant="primary" 
          type="submit" 
          disabled={isLoading}
          className="mt-3"
        >
          {isLoading ? 'Fetching...' : 'Fetch Reviews'}
        </Button>
      </Form>
    </div>
  );
};

export default ReviewForm;
