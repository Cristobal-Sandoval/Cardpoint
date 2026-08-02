import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import CardpointLogo from '../components/CardpointLogo';
import LeagueBadge from '../components/LeagueBadge';
import InstagramIcon from '../components/InstagramIcon';
import GoogleAdSlot from '../components/GoogleAdSlot';

describe('React Component Unit Tests', () => {
  describe('CardpointLogo', () => {
    it('renders logo and text by default', () => {
      render(<CardpointLogo />);
      expect(screen.getByText('CARD')).toBeInTheDocument();
      expect(screen.getByText('POINT')).toBeInTheDocument();
      expect(screen.getByText('.CL')).toBeInTheDocument();
      expect(screen.getByText('TIENDA TCG')).toBeInTheDocument();
    });

    it('hides text when showText is false', () => {
      render(<CardpointLogo showText={false} />);
      expect(screen.queryByText('CARD')).not.toBeInTheDocument();
      expect(screen.queryByText('TIENDA TCG')).not.toBeInTheDocument();
    });
  });

  describe('LeagueBadge', () => {
    it('renders LeagueBadge with image and label', () => {
      render(<LeagueBadge />);
      const img = screen.getByAltText('De Liga');
      expect(img).toBeInTheDocument();
      expect(screen.getByText('De Liga')).toBeInTheDocument();
    });
  });

  describe('InstagramIcon', () => {
    it('renders Instagram SVG icon with custom size', () => {
      const { container } = render(<InstagramIcon size={32} className="text-pink-500" />);
      const svg = container.querySelector('svg');
      expect(svg).toBeInTheDocument();
      expect(svg).toHaveAttribute('width', '32');
      expect(svg).toHaveAttribute('height', '32');
      expect(svg).toHaveClass('text-pink-500');
    });
  });

  describe('GoogleAdSlot', () => {
    it('returns null when AdSense script is not loaded or config is placeholder', () => {
      const { container } = render(<GoogleAdSlot format="horizontal" />);
      expect(container.firstChild).toBeNull();
    });

    it('returns null for card format when unconfigured', () => {
      const { container } = render(<GoogleAdSlot format="card" />);
      expect(container.firstChild).toBeNull();
    });
  });
});
