import React from 'react';

const HeaderContentsPage = () => {
  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-extrabold text-zinc-900 mb-6">Krishak AI - Navigation Contents</h1>
      <section id="about">
        <h2 className="text-2xl font-bold mb-2">About Krishak AI</h2>
        <p className="mb-4">Empowering farmers with AI-driven insights and tools for a better tomorrow. Founded by Sanjok Gharti, Krishak AI is dedicated to transforming agriculture in Nepal and beyond through technology and innovation.</p>
      </section>
      <section id="features">
        <h2 className="text-2xl font-bold mb-2">Features</h2>
        <ul className="list-disc ml-6 mb-4">
          <li>AI-powered crop recommendations</li>
          <li>Weather forecasting and alerts</li>
          <li>Market price tracking</li>
          <li>Farmer community and support</li>
        </ul>
      </section>
      <section id="products">
        <h2 className="text-2xl font-bold mb-2">Products</h2>
        <ul className="list-disc ml-6 mb-4">
          <li>Krishak AI Mobile App</li>
          <li>Farmer Dashboard</li>
          <li>Custom Reports</li>
        </ul>
      </section>
      <section id="blog">
        <h2 className="text-2xl font-bold mb-2">Blog</h2>
        <p className="mb-4">Read news, articles, updates, and stories about agriculture, technology, and Krishak AI's journey.</p>
      </section>
      <section id="team">
        <h2 className="text-2xl font-bold mb-2">Team</h2>
        <p className="mb-4">Meet the passionate people behind Krishak AI, led by founder Sanjok Gharti.</p>
      </section>
      <section id="resources">
        <h2 className="text-2xl font-bold mb-2">Resources</h2>
        <ul className="list-disc ml-6 mb-4">
          <li>Dealership Program: Partner with us to expand Krishak AI.</li>
          <li>Help Center: Get answers on your Veda's queries.</li>
          <li>FAQ: Our most asked questions answered.</li>
        </ul>
      </section>
      <section id="contact">
        <h2 className="text-2xl font-bold mb-2">Contact</h2>
        <ul className="list-disc ml-6 mb-4">
          <li>Contact Support: Reach out to our support team for help.</li>
          <li>Contact Us: For partnership or queries.</li>
        </ul>
      </section>
    </div>
  );
};

export default HeaderContentsPage;
