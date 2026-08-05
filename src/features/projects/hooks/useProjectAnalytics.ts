import { useMemo } from 'react';
import { useProjectStore } from '../store/useProjectStore';

export function useProjectAnalytics() {
  const { projects } = useProjectStore();

  const analytics = useMemo(() => {
    let activeCount = 0;
    let leadsCount = 0;

    let expectedRevenueUSD = 0;
    let expectedRevenueARS = 0;

    let pendingPaymentsUSD = 0;
    let pendingPaymentsARS = 0;

    const leadStatuses = ['prospect', 'proposal_sent', 'negotiating'];

    projects.forEach((project) => {
      // Counts
      if (project.status === 'in_progress') {
        activeCount++;
      } else if (leadStatuses.includes(project.status)) {
        leadsCount++;
      }

      // Expected Revenue (Active projects budget)
      if (project.status === 'in_progress' && project.budget) {
        if (project.currency === 'USD') expectedRevenueUSD += project.budget;
        else if (project.currency === 'ARS') expectedRevenueARS += project.budget;
      }

      // Pending Payments
      if (project.paymentStatus && ['Pendiente', 'Parcial'].includes(project.paymentStatus) && project.budget) {
        let amountOwed = project.budget;
        if (project.paymentStatus === 'Parcial' && project.paidAmount) {
          amountOwed = project.budget - project.paidAmount;
        }

        if (amountOwed > 0) {
          if (project.currency === 'USD') pendingPaymentsUSD += amountOwed;
          else if (project.currency === 'ARS') pendingPaymentsARS += amountOwed;
        }
      }
    });

    return {
      overview: {
        activeProjects: activeCount,
        leads: leadsCount,
      },
      financials: {
        expectedRevenue: {
          USD: expectedRevenueUSD,
          ARS: expectedRevenueARS,
        },
        pendingPayments: {
          USD: pendingPaymentsUSD,
          ARS: pendingPaymentsARS,
        }
      },
      hasData: projects.length > 0
    };
  }, [projects]);

  return analytics;
}
