'use client';

import { useState } from 'react';
import styles from './Terminal.module.css';

// ─── DATA STRUCTURE FOR TABS & OUTPUT ───
const FILES = [
  {
    id: 'html',
    name: 'index.html',
    iconClass: styles.iconHtml,
    iconText: '<>',
    lines: 7,
    content: (
      <>
        <span className={styles.tag}>&lt;!DOCTYPE html&gt;</span><br />
        <span className={styles.tag}>&lt;html</span> <span className={styles.attr}>lang</span>=<span className={styles.str}>"en"</span><span className={styles.tag}>&gt;</span><br />
        <span className={styles.tag}>&lt;body&gt;</span><br />
        {'  '}<span className={styles.tag}>&lt;h1&gt;</span>Hello World!<span className={styles.tag}>&lt;/h1&gt;</span><br />
        <span className={styles.tag}>&lt;/body&gt;</span><br />
        <span className={styles.tag}>&lt;/html&gt;</span><br />
      </>
    ),
    outputTitle: 'Browser Preview',
    output: (
      <div className={styles.browserOutput}>
        <h1>Hello World!</h1>
      </div>
    )
  },
  {
    id: 'js',
    name: 'app.js',
    iconClass: styles.iconJs,
    iconText: 'JS',
    lines: 5,
    content: (
      <>
        <span className={styles.kw}>function</span> <span className={styles.func}>sayHello</span>() {'{'}<br />
        {'  '}<span className={styles.attr}>console</span>.<span className={styles.func}>log</span>(<span className={styles.str}>"Hello World!"</span>);<br />
        {'}'}<br />
        <br />
        <span className={styles.func}>sayHello</span>();<br />
      </>
    ),
    outputTitle: 'Terminal',
    output: (
      <div className={styles.cmdOutput}>
        <span className={styles.cmdPath}>~/sabin/portfolio $</span> node app.js<br />
        Hello World!<br />
        <span className={styles.cmdPath}>~/sabin/portfolio $</span> <span className={styles.cursorBlink}></span>
      </div>
    )
  },
  {
    id: 'cs',
    name: 'Program.cs',
    iconClass: styles.iconCs,
    iconText: 'C#',
    lines: 7,
    content: (
      <>
        <span className={styles.kw2}>using</span> System;<br />
        <br />
        <span className={styles.kw}>class</span> <span className={styles.type}>Program</span> {'{'}<br />
        {'    '}<span className={styles.kw}>static void</span> <span className={styles.func}>Main</span>() {'{'}<br />
        {'        '}<span className={styles.type}>Console</span>.<span className={styles.func}>WriteLine</span>(<span className={styles.str}>"Hello World!"</span>);<br />
        {'    }'}<br />
        {'}'}<br />
      </>
    ),
    outputTitle: 'Terminal',
    output: (
      <div className={styles.cmdOutput}>
        <span className={styles.cmdPath}>~/sabin/portfolio $</span> dotnet run<br />
        Hello World!<br />
        <span className={styles.cmdPath}>~/sabin/portfolio $</span> <span className={styles.cursorBlink}></span>
      </div>
    )
  },
  {
    id: 'py',
    name: 'main.py',
    iconClass: styles.iconPy,
    iconText: 'PY',
    lines: 4,
    content: (
      <>
        <span className={styles.kw}>def</span> <span className={styles.func}>say_hello</span>():<br />
        {'    '}<span className={styles.func}>print</span>(<span className={styles.str}>"Hello World!"</span>)<br />
        <br />
        <span className={styles.func}>say_hello</span>()<br />
      </>
    ),
    outputTitle: 'Terminal',
    output: (
      <div className={styles.cmdOutput}>
        <span className={styles.cmdPath}>~/sabin/portfolio $</span> python main.py<br />
        Hello World!<br />
        <span className={styles.cmdPath}>~/sabin/portfolio $</span> <span className={styles.cursorBlink}></span>
      </div>
    )
  },
];

export default function Terminal() {
  const [activeTab, setActiveTab] = useState<string>('html');

  const activeFile = FILES.find((f) => f.id === activeTab) || FILES[0];

  return (
    <section className={styles.sectionWrap} id="terminal">
      
      {/* ─── GLOBAL HEADER ─── */}
      <div className="section-header reveal">
        <div className="section-tag">03 — Terminal</div>
        <h2 className="section-title">One Developer, <em>Different Languages</em></h2>
      </div>

      <div className={styles.container}>
        
        {/* ─── WINDOW 1: EDITOR ─── */}
        <div className={styles.window}>
          {/* Mac Traffic Lights */}
          <div className={styles.topBar}>
            <div className={`${styles.dot} ${styles.dotClose}`}></div>
            <div className={`${styles.dot} ${styles.dotMin}`}></div>
            <div className={`${styles.dot} ${styles.dotMax}`}></div>
          </div>

          {/* Tabs */}
          <div className={styles.tabBar}>
            {FILES.map((file) => (
              <div
                key={file.id}
                className={`${styles.tab} ${activeTab === file.id ? styles.tabActive : ''}`}
                onClick={() => setActiveTab(file.id)}
              >
                <span className={file.iconClass}>{file.iconText}</span>
                {file.name}
              </div>
            ))}
          </div>

          {/* Editor Body */}
          <div className={styles.editor}>
            <div className={styles.lineNumbers}>
              {Array.from({ length: activeFile.lines }, (_, i) => (
                <span key={i}>{i + 1}</span>
              ))}
            </div>
            <div className={styles.codeArea}>
              {activeFile.content}
            </div>
          </div>
        </div>

        {/* ─── WINDOW 2: OUTPUT ─── */}
        <div className={styles.window}>
          {/* Mac Traffic Lights (Consistency) */}
          <div className={styles.topBar}>
            <div className={`${styles.dot} ${styles.dotClose}`}></div>
            <div className={`${styles.dot} ${styles.dotMin}`}></div>
            <div className={`${styles.dot} ${styles.dotMax}`}></div>
          </div>

          {/* Tab */}
          <div className={styles.tabBar}>
            <div className={`${styles.tab} ${styles.tabOutput}`}>
              {activeFile.id === 'html' ? (
                <span className={styles.iconTerminal}>🌐</span>
              ) : (
                <span className={styles.iconTerminal}>&gt;_</span>
              )}
              {activeFile.outputTitle}
            </div>
          </div>

          {/* Output Body */}
          <div className={styles.outputArea}>
            {activeFile.output}
          </div>
        </div>

      </div>
    </section>
  );
}