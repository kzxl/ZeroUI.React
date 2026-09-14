import React, { useState } from 'react';
import { useZeroTheme } from '../core/theme/ThemeProvider';
import { MenuIcons } from '../core/icons/MenuIcons';
import { ButtonGroup } from '../components/ButtonGroup';
import { ContextMenu, ContextMenuItem } from '../components/ContextMenu';
import { ButtonGroupItem } from '../core/models/ButtonGroupModel';
import './App.css';

export const App: React.FC = () => {
  const { mode, toggleTheme } = useZeroTheme();
  const [contextMenuState, setContextMenuState] = useState<{
    isOpen: boolean;
    x: number;
    y: number;
  }>({
    isOpen: false,
    x: 0,
    y: 0,
  });

  const [lastAction, setLastAction] = useState<string>('Ready');

  // Action Strip items
  const actionItems: ButtonGroupItem[] = [
    {
      id: 'save',
      text: 'Save',
      iconGlyph: MenuIcons.Save,
      style: 'primary',
      showBadgeDot: true,
      action: () => setLastAction('Clicked Save (Changes pending)'),
    },
    {
      id: 'export',
      text: 'Export',
      iconGlyph: MenuIcons.Export,
      type: 'dropdown',
      dropDownItems: [
        {
          id: 'exp_pdf',
          text: 'Export as PDF',
          icon: MenuIcons.Document,
          onClick: () => setLastAction('Exported as PDF'),
        },
        {
          id: 'exp_excel',
          text: 'Export as Excel',
          icon: MenuIcons.Copy,
          onClick: () => setLastAction('Exported as Excel'),
        },
      ],
    },
    {
      id: 'sep1',
      type: 'separator',
    },
    {
      id: 'reload',
      text: 'Refresh',
      iconGlyph: MenuIcons.Refresh,
      badgeText: '5',
      action: () => setLastAction('Clicked Refresh (5 updates)'),
    },
    {
      id: 'delete',
      text: 'Delete',
      iconGlyph: MenuIcons.Delete,
      style: 'danger',
      action: () => setLastAction('Clicked Danger Delete'),
    },
  ];

  // Mode Selector (Single Select Toggle)
  const modeItems: ButtonGroupItem[] = [
    {
      id: 'view_map',
      text: 'Process Map',
      iconGlyph: MenuIcons.Flow,
      type: 'toggle',
      isChecked: true,
    },
    {
      id: 'view_grid',
      text: 'Data Grid',
      iconGlyph: MenuIcons.Document,
      type: 'toggle',
    },
    {
      id: 'view_analytics',
      text: 'Analytics',
      iconGlyph: MenuIcons.AutoLayout,
      type: 'toggle',
    },
  ];

  // Context Menu Items
  const contextMenuItems: ContextMenuItem[] = [
    {
      id: 'edit',
      text: 'Edit Step',
      icon: MenuIcons.Edit,
      shortcut: 'F2',
      onClick: () => setLastAction('Menu: Edit Step'),
    },
    {
      id: 'copy',
      text: 'Copy Flow Node',
      icon: MenuIcons.Copy,
      shortcut: 'Ctrl+C',
      onClick: () => setLastAction('Menu: Copy Flow Node'),
    },
    {
      id: 'fit',
      text: 'Fit Lanes to Nodes',
      icon: MenuIcons.FitToContent,
      onClick: () => setLastAction('Menu: Fit Lanes to Nodes'),
    },
    {
      id: 'auto_layout',
      text: 'Auto-Arrange Flow',
      icon: MenuIcons.AutoLayout,
      shortcut: 'Ctrl+L',
      onClick: () => setLastAction('Menu: Auto-Arrange Flow'),
    },
    {
      id: 'sep_1',
      isSeparator: true,
    },
    {
      id: 'delete_step',
      text: 'Delete Selection',
      icon: MenuIcons.Delete,
      shortcut: 'Del',
      isDanger: true,
      onClick: () => setLastAction('Menu: Delete Selection'),
    },
  ];

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    setContextMenuState({
      isOpen: true,
      x: e.clientX,
      y: e.clientY,
    });
  };

  const iconCatalog = [
    { name: 'Add', icon: MenuIcons.Add },
    { name: 'Edit', icon: MenuIcons.Edit },
    { name: 'Delete', icon: MenuIcons.Delete },
    { name: 'Save', icon: MenuIcons.Save },
    { name: 'Refresh', icon: MenuIcons.Refresh },
    { name: 'Search', icon: MenuIcons.Search },
    { name: 'Copy', icon: MenuIcons.Copy },
    { name: 'Paste', icon: MenuIcons.Paste },
    { name: 'Export', icon: MenuIcons.Export },
    { name: 'Import', icon: MenuIcons.Import },
    { name: 'Print', icon: MenuIcons.Print },
    { name: 'Frame', icon: MenuIcons.Frame },
    { name: 'FitToContent', icon: MenuIcons.FitToContent },
    { name: 'AutoLayout', icon: MenuIcons.AutoLayout },
    { name: 'Connect', icon: MenuIcons.Connect },
    { name: 'Settings', icon: MenuIcons.Settings },
  ];

  return (
    <div className="showcase-container">
      {/* Header */}
      <header className="showcase-header">
        <h1 className="showcase-title">
          <span>⚡ ZeroUI.React</span>
          <span className="showcase-badge">v1.0.0 Web Suite</span>
        </h1>
        <button
          type="button"
          onClick={toggleTheme}
          style={{
            padding: '8px 16px',
            borderRadius: '6px',
            border: '1px solid var(--zero-border)',
            backgroundColor: 'var(--zero-surface)',
            color: 'var(--zero-text-primary)',
            cursor: 'pointer',
            fontWeight: 600,
            fontSize: '13px',
          }}
        >
          {mode === 'dark' ? '☀️ Switch to Light Skin' : '🌙 Switch to Dark Skin'}
        </button>
      </header>

      {/* Status Bar */}
      <div
        style={{
          marginBottom: '20px',
          padding: '10px 16px',
          borderRadius: '6px',
          backgroundColor: 'var(--zero-surface)',
          border: '1px solid var(--zero-border)',
          fontSize: '13px',
          color: 'var(--zero-primary)',
          fontWeight: 600,
        }}
      >
        Last Action: <span style={{ color: 'var(--zero-text-primary)', fontWeight: 400 }}>{lastAction}</span>
      </div>

      {/* Section 1: ButtonGroup Action Strip */}
      <section className="showcase-section">
        <h2 className="showcase-section-title">1. Connected Action Strip (ButtonGroup)</h2>
        <p className="showcase-section-desc">
          Zero-space connected button cluster supporting auto-fit, dropdown menu popovers, dirty badge dots, and style accents.
        </p>

        <div className="showcase-demo-row">
          <div className="showcase-demo-item">
            <span className="showcase-demo-label">Auto-Fit Action Strip</span>
            <ButtonGroup
              items={actionItems}
              sizeMode="auto-fit"
              onItemClick={(item) => setLastAction(`Clicked item: ${item.text || item.id}`)}
            />
          </div>

          <div className="showcase-demo-item">
            <span className="showcase-demo-label">Equal-Width Action Strip (Full Stretch)</span>
            <ButtonGroup
              items={actionItems.filter((i) => i.type !== 'separator')}
              sizeMode="equal-width"
              onItemClick={(item) => setLastAction(`Clicked item: ${item.text || item.id}`)}
            />
          </div>
        </div>
      </section>

      {/* Section 2: Mode Selector */}
      <section className="showcase-section">
        <h2 className="showcase-section-title">2. Toggle Selection Mode (Radio Strip)</h2>
        <p className="showcase-section-desc">
          Single-select mutual exclusion state coordinator synchronized with desktop ZeroUI.
        </p>

        <ButtonGroup
          items={modeItems}
          selectionMode="single-select"
          sizeMode="auto-fit"
          onSelectionChange={(selected) =>
            setLastAction(`Selected View: ${selected.map((s) => s.text).join(', ')}`)
          }
        />
      </section>

      {/* Section 3: Context Menu */}
      <section className="showcase-section">
        <h2 className="showcase-section-title">3. Enterprise Context Menu</h2>
        <p className="showcase-section-desc">
          Right-click the area below to trigger the modern floating context menu.
        </p>

        <div className="context-zone" onContextMenu={handleContextMenu}>
          🖱 Right-click anywhere in this box to open ZeroUI Context Menu
        </div>

        <ContextMenu
          isOpen={contextMenuState.isOpen}
          x={contextMenuState.x}
          y={contextMenuState.y}
          items={contextMenuItems}
          onClose={() => setContextMenuState((prev) => ({ ...prev, isOpen: false }))}
        />
      </section>

      {/* Section 4: MenuIcons Set */}
      <section className="showcase-section">
        <h2 className="showcase-section-title">4. Universal MenuIcons Set</h2>
        <p className="showcase-section-desc">
          Identical crisp icon glyphs shared between C# Desktop and React Web.
        </p>

        <div className="icons-grid">
          {iconCatalog.map((ic) => (
            <div key={ic.name} className="icon-card">
              <span className="icon-glyph">{ic.icon}</span>
              <span>{ic.name}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
