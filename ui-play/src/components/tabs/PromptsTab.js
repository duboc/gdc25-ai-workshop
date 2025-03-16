import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Nav, Tab, Button, OverlayTrigger, Tooltip } from 'react-bootstrap';
import ReactMarkdown from 'react-markdown';

/**
 * PromptsTab Component
 * 
 * This tab displays the available AI prompts for analyzing Google Play reviews.
 * It loads markdown files from the data/prompts directory and renders them.
 */
const PromptsTab = () => {
  const [prompts, setPrompts] = useState([]);
  const [activePrompt, setActivePrompt] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [copiedId, setCopiedId] = useState(null);

  // Load the prompts when the component mounts
  useEffect(() => {
    const loadPrompts = async () => {
      try {
        // Define the prompt files with their metadata
        const promptFiles = [
          { id: 'prompt1', title: 'Sentiment Analysis', path: '/static/prompts/prompt1.md' },
          { id: 'prompt2', title: 'Sentiment Factors', path: '/static/prompts/prompt2.md' },
          { id: 'prompt3', title: 'User Segmentation Analysis', path: '/static/prompts/prompt3.md' },
          { id: 'prompt4', title: 'Fill the Gaps', path: '/static/prompts/prompt4.md'}
        ];
        
        // Fetch the content of each prompt file
        const loadedPrompts = await Promise.all(
          promptFiles.map(async (prompt) => {
            const response = await fetch(prompt.path);
            if (!response.ok) {
              throw new Error(`Failed to fetch ${prompt.path}: ${response.statusText}`);
            }
            const content = await response.text();
            return {
              id: prompt.id,
              title: prompt.title,
              content: content
            };
          })
        );
        
        setPrompts(loadedPrompts);
        if (loadedPrompts.length > 0) {
          setActivePrompt(loadedPrompts[0].id);
        }
      } catch (err) {
        console.error('Error loading prompts:', err);
        setError('Failed to load prompts. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    
    loadPrompts();
  }, []);

  // Handle prompt selection
  const handlePromptSelect = (promptId) => {
    setActivePrompt(promptId);
  };

  // Render loading state
  if (loading) {
    return (
      <div className="prompts-tab">
        <div className="tab-header">
          <h2>AI Prompts</h2>
          <p>Loading prompts...</p>
        </div>
      </div>
    );
  }

  // Render error state
  if (error) {
    return (
      <div className="prompts-tab">
        <div className="tab-header">
          <h2>AI Prompts</h2>
          <p className="text-danger">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="prompts-tab">
      <div className="tab-header">
        <h2>AI Prompts</h2>
        <p>Use these prompts to analyze Google Play Store reviews</p>
      </div>
      
      <Tab.Container id="prompts-tabs" activeKey={activePrompt} onSelect={handlePromptSelect}>
        <Row>
          <Col md={3}>
            <Nav variant="pills" className="flex-column">
              {prompts.map((prompt) => (
                <Nav.Item key={prompt.id}>
                  <Nav.Link eventKey={prompt.id}>{prompt.title}</Nav.Link>
                </Nav.Item>
              ))}
            </Nav>
          </Col>
          <Col md={9}>
            <Tab.Content>
              {prompts.map((prompt) => (
                <Tab.Pane key={prompt.id} eventKey={prompt.id}>
                  <Card>
                    <Card.Header className="d-flex justify-content-between align-items-center">
                      <h4>{prompt.title}</h4>
                      <OverlayTrigger
                        placement="top"
                        overlay={<Tooltip id={`tooltip-copy-${prompt.id}`}>
                          {copiedId === prompt.id ? "Copied!" : "Copy to clipboard"}
                        </Tooltip>}
                      >
                        <Button 
                          variant={copiedId === prompt.id ? "success" : "outline-primary"} 
                          size="sm"
                          onClick={() => {
                            navigator.clipboard.writeText(prompt.content)
                              .then(() => {
                                setCopiedId(prompt.id);
                                setTimeout(() => {
                                  setCopiedId(null);
                                }, 2000);
                              })
                              .catch(err => {
                                console.error('Failed to copy: ', err);
                              });
                          }}
                        >
                          {copiedId === prompt.id ? "Copied!" : "Copy Prompt"}
                        </Button>
                      </OverlayTrigger>
                    </Card.Header>
                    <Card.Body>
                      <ReactMarkdown>{prompt.content}</ReactMarkdown>
                    </Card.Body>
                  </Card>
                </Tab.Pane>
              ))}
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    </div>
  );
};

export default PromptsTab;
